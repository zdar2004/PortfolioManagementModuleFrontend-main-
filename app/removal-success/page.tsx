"use client"

import { useEffect, useState } from "react"
import { UserX, ArrowRight, Shield } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"

export default function RemovalSuccessPage() {
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
          {/* User Removal Icon */}
          <div
            className={`inline-flex items-center justify-center w-24 h-24 bg-black rounded-2xl mb-8 transform transition-all duration-500 ${
              isVisible ? "scale-100 opacity-100" : "scale-75 opacity-0"
            }`}
          >
            {/* Crossed-out user icon */}
            <div className="relative">
              {/* User circle */}
              <div
                className={`w-12 h-12 border-4 border-white rounded-full relative transform transition-all duration-700 delay-200 ${
                  isVisible ? "scale-100 opacity-100" : "scale-75 opacity-0"
                }`}
              >
                {/* User head */}
                <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white rounded-full"></div>
                {/* User body */}
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-4 bg-white rounded-t-full"></div>
              </div>
              {/* Diagonal line through user */}
              <div
                className={`absolute top-0 left-0 w-12 h-12 transform transition-all duration-700 delay-400 ${
                  isVisible ? "scale-100 opacity-100" : "scale-75 opacity-0"
                }`}
              >
                <div className="absolute top-1/2 left-1/2 w-16 h-1 bg-white transform -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Success Message */}
          <h2
            className={`text-2xl md:text-3xl font-bold text-gray-900 mb-8 transform transition-all duration-500 delay-300 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            User Removed!
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
              The user has been permanently removed from the platform and all associated data has been deleted.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-4">
              <Link href="/remove-user">
                <Button variant="outline" className="w-full sm:w-auto flex items-center gap-2">
                  <UserX className="w-4 h-4" />
                  Remove Another User
                </Button>
              </Link>
              <Button variant="ghost" className="w-full sm:w-auto text-gray-600 flex items-center gap-2">
                <Shield className="w-4 h-4" />
                View Audit Log
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-500 text-sm">
        <p>Platform security maintained through responsible moderation.</p>
      </footer>
    </div>
  )
}
