"use client"

import { useState } from "react"
import { ArrowLeft, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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

const deletionReasons = [
  {
    id: "no-positions",
    label: "I no longer have positions in these stocks",
    defaultChecked: true,
  },
  {
    id: "no-tracking",
    label: "I don't want to track these stocks",
    defaultChecked: true,
  },
  {
    id: "mistake",
    label: "I made a mistake when creating this portfolio",
    defaultChecked: false,
  },
  {
    id: "cleaning",
    label: "I'm just cleaning up",
    defaultChecked: false,
  },
  {
    id: "other",
    label: "Other reason",
    defaultChecked: false,
  },
]

export default function DeletePortfolio() {
  const [selectedReasons, setSelectedReasons] = useState<string[]>(
    deletionReasons.filter((reason) => reason.defaultChecked).map((reason) => reason.id),
  )
  const [otherReason, setOtherReason] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showFinalConfirm, setShowFinalConfirm] = useState(false)

  const { toast } = useToast()
  const router = useRouter()

  const handleReasonChange = (reasonId: string, checked: boolean) => {
    if (checked) {
      setSelectedReasons((prev) => [...prev, reasonId])
    } else {
      setSelectedReasons((prev) => prev.filter((id) => id !== reasonId))
    }
  }

  const handleConfirmDeletion = async () => {
    if (selectedReasons.length === 0) {
      toast({
        title: "Please select a reason",
        description: "We'd like to understand why you're deleting this portfolio.",
        variant: "destructive",
      })
      return
    }

    if (selectedReasons.includes("other") && !otherReason.trim()) {
      toast({
        title: "Please specify other reason",
        description: "You selected 'Other reason' but didn't provide details.",
        variant: "destructive",
      })
      return
    }

    setShowFinalConfirm(true)
  }

  const handleFinalDeletion = async () => {
    setIsLoading(true)
    setShowFinalConfirm(false)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)

      // Navigate to delete success page
      router.push("/delete-success")
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <h1 className="text-xl font-semibold">PortfolioPro</h1>
          </div>
          <Link href="/" className="text-gray-600 hover:text-gray-900">
            Dashboard
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-sm border p-8">
          {/* Warning Section */}
          <div className="flex items-start gap-4 mb-8">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Delete portfolio</h2>
              <p className="text-gray-600">
                Are you sure you want to delete this portfolio? You can't undo this action.
              </p>
            </div>
          </div>

          {/* Deletion Reasons */}
          <div className="space-y-6 mb-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Help us understand why you're deleting this portfolio:
              </h3>

              <div className="space-y-4">
                {deletionReasons.map((reason) => (
                  <div key={reason.id} className="flex items-start gap-3">
                    <Checkbox
                      id={reason.id}
                      checked={selectedReasons.includes(reason.id)}
                      onCheckedChange={(checked) => handleReasonChange(reason.id, checked as boolean)}
                      className="mt-0.5"
                    />
                    <Label htmlFor={reason.id} className="text-sm text-gray-700 cursor-pointer leading-relaxed">
                      {reason.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Other Reason Text Area */}
            {selectedReasons.includes("other") && (
              <div className="space-y-2 ml-6">
                <Label htmlFor="other-reason" className="text-sm font-medium">
                  Please specify:
                </Label>
                <Textarea
                  id="other-reason"
                  placeholder="Tell us more about your reason for deleting this portfolio..."
                  value={otherReason}
                  onChange={(e) => setOtherReason(e.target.value)}
                  className="min-h-[80px] resize-none"
                  maxLength={500}
                />
                <div className="text-xs text-gray-500 text-right">{otherReason.length}/500</div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-end">
            <Link href="/">
              <Button variant="outline">Cancel</Button>
            </Link>

            <AlertDialog open={showFinalConfirm} onOpenChange={setShowFinalConfirm}>
              <AlertDialogTrigger asChild>
                <Button
                  onClick={handleConfirmDeletion}
                  className="bg-red-600 hover:bg-red-700 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Deleting..." : "Confirm deletion"}
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    Final Confirmation
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your portfolio and remove all associated
                    data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleFinalDeletion} className="bg-red-600 hover:bg-red-700">
                    Yes, delete permanently
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          {/* Additional Info */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-900 mb-2">What happens when you delete:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• All portfolio data will be permanently removed</li>
              <li>• Historical performance data will be lost</li>
              <li>• Any shared links will stop working</li>
              <li>• This action cannot be reversed</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}
