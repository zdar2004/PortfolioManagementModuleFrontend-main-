"use client"

import { useEffect, useState } from "react"
import { Trash2, ArrowRight, Plus, RotateCcw } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"

export default function DeleteSuccessPage() {
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
        <h1 className="text-xl font-semibold">PortfolioPro</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-md mx-auto">
          {/* Delete Icon */}
          <div
            className={`inline-flex items-center justify-center w-24 h-24 bg-black rounded-2xl mb-8 transform transition-all duration-500 ${
              isVisible ? "scale-100 opacity-100" : "scale-75 opacity-0"
            }`}
          >
            <div className="relative">
              {/* Trash Can Icon */}
              <Trash2
                className={`w-10 h-10 text-white transform transition-all duration-700 delay-200 ${
                  isVisible ? "scale-100 opacity-100" : "scale-75 opacity-0"
                }`}
                strokeWidth={2.5}
              />
              {/* Horizontal Lines representing deleted items */}
              <div
                className={`absolute -right-6 top-1 space-y-1 transform transition-all duration-500 delay-400 ${
                  isVisible ? "translate-x-0 opacity-100" : "translate-x-2 opacity-0"
                }`}
              >
                <div className="w-4 h-0.5 bg-white rounded"></div>
                <div className="w-3 h-0.5 bg-white rounded"></div>
                <div className="w-2 h-0.5 bg-white rounded"></div>
              </div>
            </div>
          </div>

          {/* Success Message */}
          <h2
            className={`text-2xl md:text-3xl font-bold text-gray-900 mb-8 transform transition-all duration-500 delay-300 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            Portfolio Deleted Successfully!
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
            <p className="text-gray-600 text-sm">Your portfolio has been permanently removed from your account.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-4">
              <Link href="/create-portfolio">
                <Button variant="outline" className="w-full sm:w-auto flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Create New Portfolio
                </Button>
              </Link>
              <Button variant="ghost" className="w-full sm:w-auto text-gray-600 flex items-center gap-2" disabled>
                <RotateCcw className="w-4 h-4" />
                Undo (Not Available)
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-500 text-sm">
        <p>Ready to start fresh? Create a new portfolio anytime.</p>
      </footer>
    </div>
  )
}
