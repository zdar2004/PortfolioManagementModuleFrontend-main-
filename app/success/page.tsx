"use client"

import { useEffect, useState } from "react"
import { Check, ArrowRight, Plus, Eye } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"

export default function SuccessPage() {
  const [isVisible, setIsVisible] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  const handleDashboardClick = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Check className="h-4 w-4 text-white" />
          </div>
          <h1 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            PortfolioPro
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-md mx-auto">
          {/* Success Icon */}
          <div
            className={`inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl mb-8 transform transition-all duration-500 shadow-2xl ${
              isVisible ? "scale-100 opacity-100" : "scale-75 opacity-0"
            }`}
          >
            <Check
              className={`w-16 h-16 text-white transform transition-all duration-700 delay-200 ${
                isVisible ? "scale-100 opacity-100" : "scale-75 opacity-0"
              }`}
              strokeWidth={3}
            />
          </div>

          {/* Success Message */}
          <h2
            className={`text-4xl font-bold text-slate-900 mb-4 transform transition-all duration-500 delay-300 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            Portfolio Created Successfully!
          </h2>

          <p
            className={`text-lg text-slate-600 mb-8 transform transition-all duration-500 delay-400 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            Your portfolio has been created and is ready to share!
          </p>

          {/* Dashboard Button */}
          <div
            className={`transform transition-all duration-500 delay-500 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <Button
              onClick={handleDashboardClick}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-200 hover:scale-105 active:scale-95 group shadow-lg"
            >
              Dashboard
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Additional Actions */}
          <div
            className={`mt-8 space-y-4 transform transition-all duration-500 delay-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/create-portfolio">
                <Button variant="outline" className="w-full sm:w-auto border-blue-300 text-blue-600 hover:bg-blue-50">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Another
                </Button>
              </Link>
              <Button variant="ghost" className="w-full sm:w-auto text-slate-600 hover:bg-slate-100">
                <Eye className="w-4 h-4 mr-2" />
                View Portfolio
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-slate-500">
        <p>Ready to showcase your work to the world!</p>
      </footer>
    </div>
  )
}
