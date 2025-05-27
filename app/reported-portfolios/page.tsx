"use client"

import { useState } from "react"
import { ArrowLeft, Search, Eye, CheckCircle, XCircle, AlertTriangle, Clock, User } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const activeReports = [
  {
    id: 1,
    reportedUser: "John Doe",
    avatar: "/placeholder.svg?height=40&width=40",
    reason: "This portfolio contains copyrighted content",
    reportedAt: "2024-01-15T10:30:00Z",
    reportCount: 3,
    severity: "high",
    status: "pending",
  },
  {
    id: 2,
    reportedUser: "Mark",
    avatar: "/placeholder.svg?height=40&width=40",
    reason: "This portfolio contains copyrighted content",
    reportedAt: "2024-01-14T15:45:00Z",
    reportCount: 2,
    severity: "medium",
    status: "pending",
  },
  {
    id: 3,
    reportedUser: "Ruby",
    avatar: "/placeholder.svg?height=40&width=40",
    reason: "This portfolio contains copyrighted content",
    reportedAt: "2024-01-13T09:20:00Z",
    reportCount: 1,
    severity: "medium",
    status: "pending",
  },
]

const ignoredReports = [
  {
    id: 4,
    reportedUser: "Hailey",
    avatar: "/placeholder.svg?height=40&width=40",
    reason: "This portfolio contains copyrighted content",
    reportedAt: "2024-01-12T14:10:00Z",
    reportCount: 1,
    severity: "low",
    status: "ignored",
  },
]

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "high":
      return "bg-red-100 text-red-800 border-red-200"
    case "medium":
      return "bg-orange-100 text-orange-800 border-orange-200"
    case "low":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const getTimeAgo = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

  if (diffInHours < 24) {
    return `${diffInHours}h ago`
  } else {
    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }
}

export default function ReportedPortfolios() {
  const [searchQuery, setSearchQuery] = useState("")
  const [reports, setReports] = useState(activeReports)
  const [ignored, setIgnored] = useState(ignoredReports)

  const { toast } = useToast()
  const router = useRouter()

  const handleReportAction = (reportId: number, action: "approve" | "ignore" | "investigate") => {
    const report = reports.find((r) => r.id === reportId)
    if (!report) return

    switch (action) {
      case "approve":
        setReports((prev) => prev.filter((r) => r.id !== reportId))
        toast({
          title: "Report approved",
          description: `Action will be taken against ${report.reportedUser}'s portfolio.`,
        })
        break
      case "ignore":
        setReports((prev) => prev.filter((r) => r.id !== reportId))
        setIgnored((prev) => [...prev, { ...report, status: "ignored" }])
        toast({
          title: "Report ignored",
          description: `Report against ${report.reportedUser} has been dismissed.`,
        })
        break
      case "investigate":
        toast({
          title: "Investigation started",
          description: `Further investigation initiated for ${report.reportedUser}'s portfolio.`,
        })
        break
    }
  }

  const filteredReports = reports.filter(
    (report) =>
      report.reportedUser.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.reason.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredIgnored = ignored.filter(
    (report) =>
      report.reportedUser.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.reason.toLowerCase().includes(searchQuery.toLowerCase()),
  )

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
        <div className="space-y-6">
          {/* Page Title */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Reported portfolios</h2>
            <p className="text-gray-600">Review and manage community reports about portfolio content.</p>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search reports by user or reason..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>

          {/* Active Reports */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                Reports ({filteredReports.length})
              </h3>
              {filteredReports.length > 0 && (
                <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                  Requires Action
                </Badge>
              )}
            </div>

            {filteredReports.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">No active reports</h4>
                  <p className="text-gray-600">All reports have been reviewed and resolved.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {filteredReports.map((report) => (
                  <Card key={report.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        {/* User Avatar */}
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={report.avatar || "/placeholder.svg"} alt={report.reportedUser} />
                          <AvatarFallback>
                            <User className="h-6 w-6" />
                          </AvatarFallback>
                        </Avatar>

                        {/* Report Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-gray-900">{report.reportedUser}</h4>
                            <Badge variant="outline" className={`text-xs ${getSeverityColor(report.severity)}`}>
                              {report.severity}
                            </Badge>
                            {report.reportCount > 1 && (
                              <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                                {report.reportCount} reports
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-1">{report.reason}</p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Clock className="h-3 w-3" />
                            <span>{getTimeAgo(report.reportedAt)}</span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              toast({
                                title: "Portfolio preview",
                                description: `Opening ${report.reportedUser}'s portfolio`,
                              })
                            }
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="sm">
                                Actions
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleReportAction(report.id, "approve")}>
                                <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                                Approve Report
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleReportAction(report.id, "ignore")}>
                                <XCircle className="h-4 w-4 mr-2 text-gray-600" />
                                Ignore Report
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleReportAction(report.id, "investigate")}>
                                <AlertTriangle className="h-4 w-4 mr-2 text-orange-600" />
                                Investigate Further
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Ignored Reports */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
              <XCircle className="h-5 w-5 text-gray-500" />
              Ignored reports ({filteredIgnored.length})
            </h3>

            {filteredIgnored.length === 0 ? (
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-gray-500">No ignored reports to display.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {filteredIgnored.map((report) => (
                  <Card key={report.id} className="opacity-75">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        {/* User Avatar */}
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={report.avatar || "/placeholder.svg"} alt={report.reportedUser} />
                          <AvatarFallback>
                            <User className="h-5 w-5" />
                          </AvatarFallback>
                        </Avatar>

                        {/* Report Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-gray-700">{report.reportedUser}</h4>
                            <Badge variant="outline" className="text-xs bg-gray-50 text-gray-600 border-gray-200">
                              Ignored
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-500">{report.reason}</p>
                        </div>

                        {/* Restore Action */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setIgnored((prev) => prev.filter((r) => r.id !== report.id))
                            setReports((prev) => [...prev, { ...report, status: "pending" }])
                            toast({
                              title: "Report restored",
                              description: `Report against ${report.reportedUser} moved back to active reports.`,
                            })
                          }}
                        >
                          Restore
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
