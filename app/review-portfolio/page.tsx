"use client"

import { useState } from "react"
import { ArrowLeft, Eye, MessageSquare, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

const portfolioItems = [
  {
    id: 1,
    title: "Portfolio 1",
    thumbnail: "/placeholder.svg?height=80&width=120",
    description: "Interior Design Collection",
    itemCount: 12,
    category: "Interior Design",
  },
  {
    id: 2,
    title: "Portfolio 2",
    thumbnail: "/placeholder.svg?height=80&width=120",
    description: "UI/UX Design Showcase",
    itemCount: 8,
    category: "Digital Design",
  },
  {
    id: 3,
    title: "Portfolio 3",
    thumbnail: "/placeholder.svg?height=80&width=120",
    description: "Fashion Photography",
    itemCount: 15,
    category: "Photography",
  },
]

export default function ReviewPortfolio() {
  const [approvalOption, setApprovalOption] = useState("approve")
  const [feedback, setFeedback] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedPortfolio, setSelectedPortfolio] = useState<number | null>(null)

  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async () => {
    if (approvalOption === "request-changes" && !feedback.trim()) {
      toast({
        title: "Feedback required",
        description: "Please provide feedback when requesting changes.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)

      // Navigate to review success page
      router.push("/review-success")
    }, 2000)
  }

  const handlePortfolioPreview = (portfolioId: number) => {
    setSelectedPortfolio(portfolioId)
    toast({
      title: "Portfolio preview",
      description: `Opening preview for ${portfolioItems.find((p) => p.id === portfolioId)?.title}`,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b px-6 py-4">
        <div className="flex items-center gap-4 max-w-6xl mx-auto">
          <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <h1 className="text-xl font-semibold">PortfolioPro</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="space-y-8">
          {/* Page Title */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Review portfolio</h2>
            <p className="text-gray-600">Review the portfolio content and provide your approval decision.</p>
          </div>

          {/* Portfolio Content Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">Portfolio content</h3>

            <div className="space-y-3">
              {portfolioItems.map((portfolio) => (
                <Card
                  key={portfolio.id}
                  className={`transition-all duration-200 hover:shadow-md cursor-pointer ${
                    selectedPortfolio === portfolio.id ? "ring-2 ring-blue-500" : ""
                  }`}
                  onClick={() => setSelectedPortfolio(portfolio.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      {/* Thumbnail */}
                      <div className="relative w-20 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={portfolio.thumbnail || "/placeholder.svg"}
                          alt={portfolio.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Portfolio Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-gray-900">{portfolio.title}</h4>
                          <Badge variant="secondary" className="text-xs">
                            {portfolio.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{portfolio.description}</p>
                        <p className="text-xs text-gray-500">{portfolio.itemCount} items</p>
                      </div>

                      {/* Preview Button */}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          handlePortfolioPreview(portfolio.id)
                        }}
                        className="flex items-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        Preview
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Approval Options Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">Approval options</h3>

            <RadioGroup value={approvalOption} onValueChange={setApprovalOption} className="space-y-3">
              <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <RadioGroupItem value="approve" id="approve" />
                <Label htmlFor="approve" className="flex items-center gap-2 cursor-pointer flex-1">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-medium">Approve this portfolio</span>
                </Label>
              </div>

              <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <RadioGroupItem value="request-changes" id="request-changes" />
                <Label htmlFor="request-changes" className="flex items-center gap-2 cursor-pointer flex-1">
                  <AlertCircle className="w-5 h-5 text-orange-600" />
                  <span className="font-medium">Request changes</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Feedback Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-gray-600" />
              <h3 className="text-xl font-semibold text-gray-900">
                Feedback
                <span className="text-sm font-normal text-gray-500 ml-1">
                  {approvalOption === "request-changes" ? "(required)" : "(optional)"}
                </span>
              </h3>
            </div>

            <Textarea
              placeholder={
                approvalOption === "approve"
                  ? "Add any positive feedback or suggestions for the portfolio owner..."
                  : "Please explain what changes are needed and provide specific guidance..."
              }
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="min-h-[120px] resize-none"
              maxLength={1000}
            />

            <div className="flex justify-between text-xs text-gray-500">
              <span>
                {approvalOption === "approve"
                  ? "Share what you liked about this portfolio"
                  : "Be specific about required changes"}
              </span>
              <span>{feedback.length}/1000</span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-6">
            <Button
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-700 px-8"
              disabled={isLoading || (approvalOption === "request-changes" && !feedback.trim())}
            >
              {isLoading ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
