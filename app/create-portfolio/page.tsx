"use client"

import type React from "react"

import { useState, useRef } from "react"
import { ArrowLeft, Upload, X, Eye, Plus, ImageIcon } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

const portfolioExamples = [
  {
    id: 1,
    src: "/placeholder.svg?height=200&width=150",
    alt: "Mobile app design",
    category: "Mobile Design",
    gradient: "from-blue-400 to-purple-500",
  },
  {
    id: 2,
    src: "/placeholder.svg?height=200&width=150",
    alt: "Product design",
    category: "Product Design",
    gradient: "from-green-400 to-blue-500",
  },
  {
    id: 3,
    src: "/placeholder.svg?height=200&width=150",
    alt: "Web interface",
    category: "Web Design",
    gradient: "from-purple-400 to-pink-500",
  },
  {
    id: 4,
    src: "/placeholder.svg?height=200&width=150",
    alt: "Mobile interface",
    category: "UI Design",
    gradient: "from-orange-400 to-red-500",
  },
  {
    id: 5,
    src: "/placeholder.svg?height=200&width=150",
    alt: "Branding design",
    category: "Branding",
    gradient: "from-teal-400 to-blue-500",
  },
  {
    id: 6,
    src: "/placeholder.svg?height=200&width=150",
    alt: "App interface",
    category: "App Design",
    gradient: "from-pink-400 to-purple-500",
  },
]

export default function CreatePortfolio() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()
  const router = useRouter()

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    const validFiles = files.filter((file) => {
      const isValidType = file.type.startsWith("image/") || file.type === "application/pdf"
      const isValidSize = file.size <= 10 * 1024 * 1024

      if (!isValidType) {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not a supported file type.`,
          variant: "destructive",
        })
        return false
      }

      if (!isValidSize) {
        toast({
          title: "File too large",
          description: `${file.name} exceeds the 10MB limit.`,
          variant: "destructive",
        })
        return false
      }

      return true
    })

    setUploadedFiles((prev) => [...prev, ...validFiles])

    if (validFiles.length > 0) {
      toast({
        title: "Files uploaded",
        description: `${validFiles.length} file(s) added successfully.`,
      })
    }
  }

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handlePreview = () => {
    if (!title.trim()) {
      toast({
        title: "Title required",
        description: "Please enter a portfolio title to preview.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Preview mode",
      description: "Portfolio preview functionality would open here.",
    })
  }

  const handleCreatePortfolio = async () => {
    if (!title.trim()) {
      toast({
        title: "Title required",
        description: "Please enter a portfolio title.",
        variant: "destructive",
      })
      return
    }

    if (!description.trim()) {
      toast({
        title: "Description required",
        description: "Please enter a portfolio description.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      router.push("/success")
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 px-6 py-4 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Plus className="h-4 w-4 text-white" />
            </div>
            <h1 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              PortfolioPro
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-8">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Create a new portfolio</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Give your portfolio a title and description. Upload images or documents to showcase your work.
          </p>
        </div>

        <div className="space-y-10">
          {/* Form Fields */}
          <Card className="border-slate-200 shadow-lg">
            <CardContent className="p-8">
              <div className="grid gap-8 md:grid-cols-2">
                <div className="space-y-3">
                  <Label htmlFor="title" className="text-base font-semibold text-slate-900">
                    Portfolio title
                  </Label>
                  <Input
                    id="title"
                    placeholder="Enter your portfolio title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="h-12 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="description" className="text-base font-semibold text-slate-900">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your portfolio and the work you'll showcase"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="min-h-[120px] resize-none border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Portfolio Gallery Examples */}
          <Card className="border-slate-200 shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Portfolio Examples</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {portfolioExamples.map((example) => (
                  <Card
                    key={example.id}
                    className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group border-slate-200"
                  >
                    <CardContent className="p-0">
                      <div className="relative aspect-[3/4]">
                        <div className={`absolute inset-0 bg-gradient-to-br ${example.gradient} opacity-90`} />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <ImageIcon className="h-8 w-8 text-white" />
                        </div>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                          <p className="text-white text-xs font-medium">{example.category}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* File Upload Section */}
          <Card className="border-slate-200 shadow-lg">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-semibold text-slate-900">Upload files</Label>
                  <span className="text-sm text-slate-500">Supports images and PDFs up to 10MB</span>
                </div>

                <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors bg-slate-50/50">
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*,.pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />

                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Upload className="h-8 w-8 text-white" />
                  </div>
                  <p className="text-slate-600 mb-4 text-lg">Drag and drop files here, or click to select</p>

                  <Button
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="mx-auto border-blue-300 text-blue-600 hover:bg-blue-50"
                  >
                    Select Files
                  </Button>
                </div>

                {/* Uploaded Files */}
                {uploadedFiles.length > 0 && (
                  <div className="space-y-4">
                    <Label className="text-base font-semibold text-slate-900">
                      Uploaded Files ({uploadedFiles.length})
                    </Label>
                    <div className="grid gap-3">
                      {uploadedFiles.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 bg-white rounded-lg border border-slate-200 shadow-sm"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                              <span className="text-xs font-bold text-white">
                                {file.name.split(".").pop()?.toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-slate-900">{file.name}</p>
                              <p className="text-sm text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(index)}
                            className="text-slate-400 hover:text-red-500 hover:bg-red-50"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6">
            <Button
              variant="outline"
              onClick={handlePreview}
              className="flex-1 h-14 text-base border-blue-300 text-blue-600 hover:bg-blue-50"
              disabled={!title.trim()}
            >
              <Eye className="h-5 w-5 mr-2" />
              Preview
            </Button>

            <Button
              onClick={handleCreatePortfolio}
              className="flex-1 h-14 text-base bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              disabled={isLoading || !title.trim() || !description.trim()}
            >
              {isLoading ? "Creating..." : "Create portfolio"}
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
