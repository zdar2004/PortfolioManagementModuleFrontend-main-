"use client"

import { useState } from "react"
import { ArrowLeft, UserX, AlertTriangle, Shield } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

const removalReasons = [
  {
    id: "spam",
    label: "Spam or scam",
    description: "User is engaging in spam activities or fraudulent behavior",
    severity: "high",
  },
  {
    id: "inappropriate",
    label: "Inappropriate content",
    description: "User consistently posts inappropriate or offensive content",
    severity: "high",
  },
  {
    id: "harassment",
    label: "Harassment or bullying",
    description: "User is harassing or bullying other community members",
    severity: "critical",
  },
  {
    id: "impersonation",
    label: "Impersonation",
    description: "User is impersonating another person or entity",
    severity: "high",
  },
  {
    id: "hate-speech",
    label: "Hate speech or symbols",
    description: "User is promoting hatred or using discriminatory symbols",
    severity: "critical",
  },
  {
    id: "violence",
    label: "Violence or dangerous organizations",
    description: "User is promoting violence or associated with dangerous groups",
    severity: "critical",
  },
  {
    id: "ip-violation",
    label: "Intellectual property violation",
    description: "User repeatedly violates intellectual property rights",
    severity: "high",
  },
  {
    id: "private-info",
    label: "Private information",
    description: "User is sharing private information without consent",
    severity: "high",
  },
  {
    id: "other",
    label: "Other",
    description: "Other serious violation requiring user removal",
    severity: "medium",
  },
]

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "critical":
      return "bg-red-100 text-red-800 border-red-200"
    case "high":
      return "bg-orange-100 text-orange-800 border-orange-200"
    case "medium":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

export default function RemoveUser() {
  const [selectedReason, setSelectedReason] = useState("spam")
  const [additionalNotes, setAdditionalNotes] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

  const { toast } = useToast()
  const router = useRouter()

  const selectedReasonData = removalReasons.find((reason) => reason.id === selectedReason)

  const handleRemoveUser = async () => {
    if (selectedReason === "other" && !additionalNotes.trim()) {
      toast({
        title: "Additional notes required",
        description: "Please provide additional notes when selecting 'Other'.",
        variant: "destructive",
      })
      return
    }

    setShowConfirmDialog(true)
  }

  const handleConfirmRemoval = async () => {
    setIsLoading(true)
    setShowConfirmDialog(false)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)

      toast({
        title: "User removed",
        description: "The user has been permanently removed from the platform.",
      })

      // Navigate to removal success page
      router.push("/removal-success")
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b px-6 py-4">
        <div className="flex items-center gap-4 max-w-4xl mx-auto">
          <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-gray-600" />
            <h1 className="text-xl font-semibold">PortfolioPro</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <UserX className="h-6 w-6 text-red-500" />
                  Remove user
                </CardTitle>
                <p className="text-gray-600 mt-2">Are you sure you want to remove this user?</p>
              </div>
              <Button
                onClick={handleRemoveUser}
                className="bg-red-600 hover:bg-red-700 text-white px-6"
                disabled={isLoading || (selectedReason === "other" && !additionalNotes.trim())}
              >
                {isLoading ? "Removing..." : "Remove"}
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-8">
            {/* Removal Reasons */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Reason for Removal</h3>

              <RadioGroup value={selectedReason} onValueChange={setSelectedReason} className="space-y-3">
                {removalReasons.map((reason) => (
                  <div
                    key={reason.id}
                    className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <RadioGroupItem value={reason.id} id={reason.id} className="mt-1" />
                    <div className="flex-1 min-w-0">
                      <Label htmlFor={reason.id} className="cursor-pointer">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-gray-900">{reason.label}</span>
                          <Badge variant="outline" className={`text-xs ${getSeverityColor(reason.severity)}`}>
                            {reason.severity}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{reason.description}</p>
                      </Label>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Additional Notes */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Additional Notes
                  {selectedReason === "other" && <span className="text-red-500 ml-1">*</span>}
                </h3>
                <span className="text-sm text-gray-500">{selectedReason === "other" ? "Required" : "Optional"}</span>
              </div>

              <Textarea
                placeholder={
                  selectedReason === "other"
                    ? "Please explain the specific reason for removing this user..."
                    : "Add any additional context or evidence for this removal (optional)..."
                }
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                className="min-h-[100px] resize-none"
                maxLength={1000}
              />

              <div className="flex justify-between text-xs text-gray-500">
                <span>
                  {selectedReason === "other"
                    ? "Provide specific details about the violation"
                    : "Document any additional evidence or context"}
                </span>
                <span>{additionalNotes.length}/1000</span>
              </div>
            </div>

            {/* Warning Notice */}
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h4 className="font-medium text-red-900 mb-1">Critical Action Warning</h4>
                  <ul className="text-sm text-red-800 space-y-1">
                    <li>• This action will permanently remove the user from the platform</li>
                    <li>• All user data, portfolios, and content will be deleted</li>
                    <li>• The user will be notified of their removal</li>
                    <li>• This action cannot be undone</li>
                    <li>• The removal will be logged for audit purposes</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Confirmation Dialog */}
            <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="flex items-center gap-2">
                    <UserX className="h-5 w-5 text-red-500" />
                    Final Confirmation Required
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    <div className="space-y-2">
                      <p>
                        You are about to permanently remove this user from PortfolioPro. This action is irreversible and
                        will:
                      </p>
                      <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                        <li>Delete all user data and portfolios</li>
                        <li>Revoke all access permissions</li>
                        <li>Send notification to the user</li>
                        <li>Create an audit log entry</li>
                      </ul>
                      <p className="font-medium text-red-600 mt-3">Reason: {selectedReasonData?.label}</p>
                    </div>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleConfirmRemoval} className="bg-red-600 hover:bg-red-700">
                    Yes, Remove User Permanently
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
