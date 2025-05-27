"use client"

import { useEffect, useState } from "react"
import { ArrowRight, Send, Shield } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"

export default function WarningSuccessPage() {
  const [isVisible, setIsVisible] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const handleDashboardClick = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b px-6 py-4">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-gray-600" />
          <h1 className="text-xl font-semibold">PortfolioPro</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-md mx-auto">
          {/* Warning Clipboard Icon */}
          <div
            className={`inline-flex items-center justify-center w-24 h-24 bg-black rounded-2xl mb-8 transform transition-all duration-500 relative ${
              isVisible ? "scale-100 opacity-100" : "scale-75 opacity-0"
            }`}
          >
            {/* Clipboard with clip */}
            <div className="relative">
              {/* Clipboard body */}
              <div
                className={`w-12 h-14 bg-white rounded-sm transform transition-all duration-700 delay-200 ${
                  isVisible ? "scale-100 opacity-100" : "scale-75 opacity-0"
                }`}
              />
              {/* Clipboard clip */}
              <div
                className={`absolute -top-1 left-1/2 transform -translate-x-1/2 w-4 h-2 bg-black rounded-t-sm transform transition-all duration-700 delay-300 ${
                  isVisible ? "scale-100 opacity-100" : "scale-75 opacity-0"
                }`}
              />
              {/* Exclamation mark */}
              <div
                className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transform transition-all duration-700 delay-400 ${
                  isVisible ? "scale-100 opacity-100" : "scale-75 opacity-0"
                }`}
              >
                <div className="w-0.5 h-4 bg-black rounded-full mb-1"></div>
                <div className="w-1 h-1 bg-black rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Success Message */}
          <h2
            className={`text-2xl md:text-3xl font-bold text-gray-900 mb-8 transform transition-all duration-500 delay-300 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            Warning Sent!
          </h2>

          {/* Dashboard Button */}
          <div
            className={`transform transition-all duration-500 delay-500 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <Button
              onClick={handleDashboardClick}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full text-lg font-medium transition-all duration-200 hover:scale-105 active:scale-95 group"
            >
              Dashboard
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Additional Actions */}
          <div
            className={`mt-6 space-y-2 transform transition-all duration-500 delay-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <p className="text-gray-600 text-sm">
              The user has been notified of the policy violation and will receive guidance on how to resolve it.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-4">
              <Link href="/send-warning">
                <Button variant="outline" className="w-full sm:w-auto flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  Send Another Warning
                </Button>
              </Link>
              <Button variant="ghost" className="w-full sm:w-auto text-gray-600 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                View Moderation Log
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-500 text-sm">
        <p>Thank you for helping maintain a safe and respectful community!</p>
      </footer>
    </div>
  )
}
