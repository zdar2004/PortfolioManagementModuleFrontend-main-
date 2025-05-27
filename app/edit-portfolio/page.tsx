"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Camera, ArrowLeft, User, Instagram, Twitter, Linkedin, Globe, Save } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

export default function EditPortfolio() {
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [bio, setBio] = useState("")
  const [instagram, setInstagram] = useState("")
  const [twitter, setTwitter] = useState("")
  const [linkedin, setLinkedin] = useState("")
  const [website, setWebsite] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()
  const router = useRouter()

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image smaller than 5MB.",
          variant: "destructive",
        })
        return
      }

      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please select a valid image file.",
          variant: "destructive",
        })
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)

      toast({
        title: "Profile photo updated",
        description: "Your profile photo has been uploaded successfully.",
      })
    }
  }

  const handleSave = async () => {
    if (!firstName.trim() || !lastName.trim()) {
      toast({
        title: "Required fields missing",
        description: "Please enter both first and last name.",
        variant: "destructive",
      })
      return
    }

    if (bio.length > 150) {
      toast({
        title: "Bio too long",
        description: "Please keep your bio under 150 characters.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      router.push("/edit-success")
    }, 1500)
  }

  const formatSocialHandle = (value: string, prefix: string) => {
    if (!value) return ""
    if (value.startsWith(prefix)) return value
    return `${prefix}${value}`
  }

  const formatLinkedIn = (value: string) => {
    if (!value) return ""
    if (value.startsWith("linkedin.com/in/")) return value
    if (value.startsWith("https://linkedin.com/in/")) return value.replace("https://", "")
    return `linkedin.com/in/${value}`
  }

  const formatWebsite = (value: string) => {
    if (!value) return ""
    if (value.startsWith("http://") || value.startsWith("https://")) return value
    if (value.includes(".")) return value
    return `${value}.com`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 px-6 py-4 sticky top-0 z-50">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <h1 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                PortfolioPro
              </h1>
            </div>
          </div>
          <Link href="/create-portfolio">
            <Button variant="outline" size="sm" className="border-blue-300 text-blue-600 hover:bg-blue-50">
              Create
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Edit Portfolio</h2>
          <p className="text-lg text-slate-600">
            Add a profile photo, edit your name, and add a bio to your portfolio.
          </p>
        </div>

        <div className="space-y-8">
          {/* Profile Photo Section */}
          <Card className="border-slate-200 shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-center gap-6">
                <Avatar className="w-24 h-24 ring-4 ring-slate-200">
                  <AvatarImage src={profileImage || ""} alt="Profile" />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-2xl">
                    <User className="w-10 h-10" />
                  </AvatarFallback>
                </Avatar>

                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Button
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2 border-blue-300 text-blue-600 hover:bg-blue-50"
                  >
                    <Camera className="w-4 h-4" />
                    Add profile photo
                  </Button>
                  <p className="text-sm text-slate-500 mt-2">JPG, PNG up to 5MB</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card className="border-slate-200 shadow-lg">
            <CardContent className="p-8 space-y-6">
              <h3 className="text-xl font-semibold text-slate-900">Personal Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="firstName" className="text-base font-medium text-slate-900">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    placeholder="Enter your first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="h-12 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="lastName" className="text-base font-medium text-slate-900">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    placeholder="Enter your last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="h-12 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="bio" className="text-base font-medium text-slate-900">
                  Bio
                </Label>
                <Textarea
                  id="bio"
                  placeholder="Tell your story in 150 characters or less"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="min-h-[100px] resize-none border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                  maxLength={150}
                />
                <div className="flex justify-between text-sm text-slate-500">
                  <span>Share what makes you unique</span>
                  <span>{bio.length}/150</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Social Media Section */}
          <Card className="border-slate-200 shadow-lg">
            <CardContent className="p-8 space-y-6">
              <h3 className="text-xl font-semibold text-slate-900">Social Media</h3>

              <div className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="instagram" className="text-base font-medium text-slate-900 flex items-center gap-2">
                    <Instagram className="w-5 h-5 text-pink-500" />
                    Instagram
                  </Label>
                  <Input
                    id="instagram"
                    placeholder="@username"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    onBlur={(e) => setInstagram(formatSocialHandle(e.target.value, "@"))}
                    className="h-12 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="twitter" className="text-base font-medium text-slate-900 flex items-center gap-2">
                    <Twitter className="w-5 h-5 text-blue-500" />
                    Twitter
                  </Label>
                  <Input
                    id="twitter"
                    placeholder="@username"
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                    onBlur={(e) => setTwitter(formatSocialHandle(e.target.value, "@"))}
                    className="h-12 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="linkedin" className="text-base font-medium text-slate-900 flex items-center gap-2">
                    <Linkedin className="w-5 h-5 text-blue-600" />
                    LinkedIn
                  </Label>
                  <Input
                    id="linkedin"
                    placeholder="linkedin.com/in/username"
                    value={linkedin}
                    onChange={(e) => setLinkedin(e.target.value)}
                    onBlur={(e) => setLinkedin(formatLinkedIn(e.target.value))}
                    className="h-12 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="website" className="text-base font-medium text-slate-900 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-green-500" />
                    Website
                  </Label>
                  <Input
                    id="website"
                    placeholder="example.com"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    onBlur={(e) => setWebsite(formatWebsite(e.target.value))}
                    className="h-12 border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end pt-6">
            <Button
              onClick={handleSave}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-3 text-base font-semibold"
              disabled={isLoading || !firstName.trim() || !lastName.trim()}
            >
              <Save className="w-4 h-4 mr-2" />
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
