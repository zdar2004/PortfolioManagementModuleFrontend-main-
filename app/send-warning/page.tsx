"use client"

import { useState } from "react"
import { ArrowLeft, AlertTriangle, Shield } from "lucide-react"
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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const warningReasons = [
  {
    id: "infringement",
    label: "Infringement on other's work",
    description: "Unauthorized use of copyrighted material or plagiarism",
    severity: "high",
  },
  {
    id: "nudity",
    label: "Nudity or sexual content",
    description: "Content that violates our community guidelines",
    severity: "high",
  },
  {
    id: "violence",
    label: "Violence, graphic content, or threats",
    description: "Content depicting violence or threatening behavior",
    severity: "critical",
  },
  {
    id: "hate-speech",
    label: "Hate speech or symbols",
    description: "Content promoting hatred or discrimination",
    severity: "critical",
  },
  {
    id: "scam",
    label: "Scam or fraud",
    description: "Deceptive or fraudulent content",
    severity: "high",
  },
  {
    id: "spam",
    label: "Spam or misleading information",
    description: "Repetitive or misleading content",
    severity: "medium",
  },
  {
    id: "other",
    label: "Other",
    description: "Other policy violation not listed above",
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

export default function SendWarning() {
  const [selectedReason, setSelectedReason] = useState("infringement")
  const [customMessage, setCustomMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

  const { toast } = useToast()
  const router = useRouter()

  const selectedReasonData = warningReasons.find((reason) => reason.id === selectedReason)

  const handleSendWarning = async () => {
    if (selectedReason === "other" && !customMessage.trim()) {
      toast({
        title: "Custom message required",
        description: "Please provide a custom message when selecting 'Other'.",
        variant: "destructive",
      })
      return
    }

    setShowConfirmDialog(true)
  }

  const handleConfirmWarning = async () => {
    setIsLoading(true)
    setShowConfirmDialog(false)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)

      toast({
        title: "Warning sent",
        description: "The warning has been sent to the user successfully.",
      })

      // Navigate to warning success page
      router.push("/warning-success")
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
      <main className="max-w-3xl mx-auto px-6 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <AlertTriangle className="h-6 w-6 text-orange-500" />
              Send a Warning
            </CardTitle>
            <p className="text-gray-600">
              Select the reason for this warning and optionally add a custom message to help the user understand the
              issue.
            </p>
          </CardHeader>

          <CardContent className="space-y-8">
            {/* Warning Reasons */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Violation Type</h3>

              <RadioGroup value={selectedReason} onValueChange={setSelectedReason} className="space-y-3">
                {warningReasons.map((reason) => (
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

            {/* Custom Message */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Write a custom message
                  {selectedReason === "other" && <span className="text-red-500 ml-1">*</span>}
                </h3>
                <span className="text-sm text-gray-500">{selectedReason === "other" ? "Required" : "Optional"}</span>
              </div>

              <Textarea
                placeholder={
                  selectedReason === "other"
                    ? "Please explain the specific policy violation..."
                    : "Add additional context or specific details about this violation (optional)..."
                }
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                className="min-h-[120px] resize-none"
                maxLength={500}
              />

              <div className="flex justify-between text-xs text-gray-500">
                <span>
                  {selectedReason === "other"
                    ? "Explain the specific issue to help the user understand"
                    : "Provide additional context to help the user improve"}
                </span>
                <span>{customMessage.length}/500</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-end pt-6">
              <Link href="/">
                <Button variant="outline" className="px-6">
                  Cancel
                </Button>
              </Link>

              <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
                <AlertDialogTrigger asChild>
                  <Button
                    onClick={handleSendWarning}
                    className="bg-green-600 hover:bg-green-700 text-white px-6"
                    disabled={isLoading || (selectedReason === "other" && !customMessage.trim())}
                  >
                    {isLoading ? "Sending..." : "Send"}
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-orange-500" />
                      Confirm Warning
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to send this warning? The user will be notified via email and in-app
                      notification. This action will be logged in their account history.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirmWarning} className="bg-green-600 hover:bg-green-700">
                      Send Warning
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
