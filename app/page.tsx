"use client"

import { useState } from "react"
import { BarChart3, Briefcase, Settings, User, Plus, Edit, Trash2, Eye, AlertTriangle, UserX, Flag } from "lucide-react"
import Link from "next/link"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

const menuItems = [
  {
    title: "Dashboard",
    icon: BarChart3,
    href: "/",
    isActive: true,
  },
  {
    title: "Portfolio",
    icon: Briefcase,
    href: "/portfolio",
    isActive: false,
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/settings",
    isActive: false,
  },
]

const actionButtons = [
  {
    label: "Create Portfolio",
    href: "/create-portfolio",
    icon: Plus,
    variant: "default" as const,
    description: "Start building a new portfolio",
  },
  {
    label: "Edit Portfolio",
    href: "/edit-portfolio",
    icon: Edit,
    variant: "secondary" as const,
    description: "Update your existing portfolio",
  },
  {
    label: "Delete Portfolio",
    href: "/delete-portfolio",
    icon: Trash2,
    variant: "secondary" as const,
    description: "Remove a portfolio permanently",
  },
  {
    label: "Review Portfolio",
    href: "/review-portfolio",
    icon: Eye,
    variant: "secondary" as const,
    description: "Review submitted portfolios",
  },
  {
    label: "Review & Feedback",
    href: "/review-feedback",
    icon: BarChart3,
    variant: "secondary" as const,
    description: "Provide detailed feedback",
  },
  {
    label: "Send Warning",
    href: "/send-warning",
    icon: AlertTriangle,
    variant: "secondary" as const,
    description: "Send policy violation warnings",
  },
  {
    label: "Remove User",
    href: "/remove-user",
    icon: UserX,
    variant: "secondary" as const,
    description: "Remove users from platform",
  },
  {
    label: "Reported Portfolios",
    href: "/reported-portfolios",
    icon: Flag,
    variant: "secondary" as const,
    description: "Manage community reports",
  },
]

function AppSidebar() {
  return (
    <Sidebar className="border-r border-slate-200 bg-white">
      <SidebarHeader className="p-6 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <BarChart3 className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            PortfolioPro
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={item.isActive}
                    className="w-full justify-start hover:bg-slate-100 data-[active=true]:bg-blue-50 data-[active=true]:text-blue-700 data-[active=true]:border-r-2 data-[active=true]:border-blue-600"
                  >
                    <Link href={item.href}>
                      <item.icon className="h-5 w-5" />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export default function Dashboard() {
  const [activeButton, setActiveButton] = useState<string | null>(null)

  const handleButtonClick = (label: string) => {
    setActiveButton(label)
    setTimeout(() => setActiveButton(null), 200)
  }

  return (
    <SidebarProvider defaultOpen>
      <div className="flex h-screen w-full bg-slate-50">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <div className="flex h-full flex-col">
            {/* Header */}
            <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6 shadow-sm">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="hover:bg-slate-100" />
                <h1 className="text-xl font-semibold text-slate-900">Dashboard</h1>
              </div>
              <Avatar className="h-9 w-9 ring-2 ring-slate-200">
                <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Sarah" />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-medium">
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            </header>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
              <div className="grid h-full grid-cols-1 lg:grid-cols-2">
                {/* Left Content */}
                <div className="flex flex-col p-8">
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome back, Sarah</h2>
                    <p className="text-slate-600 mb-8">Manage your portfolios and moderate content with ease.</p>

                    {/* Action Buttons Grid */}
                    <div className="grid gap-4 max-w-2xl">
                      {/* First Row */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {actionButtons.slice(0, 3).map((button) => (
                          <Card
                            key={button.label}
                            className="group hover:shadow-lg transition-all duration-300 border-slate-200 hover:border-blue-300"
                          >
                            <CardContent className="p-4">
                              <Link href={button.href}>
                                <div
                                  className={`flex flex-col items-center text-center space-y-3 transition-all duration-200 hover:scale-105 ${
                                    activeButton === button.label ? "scale-95" : ""
                                  }`}
                                  onClick={() => handleButtonClick(button.label)}
                                >
                                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                                    <button.icon className="h-6 w-6 text-white" />
                                  </div>
                                  <div>
                                    <h3 className="font-semibold text-slate-900 text-sm mb-1">{button.label}</h3>
                                    <p className="text-xs text-slate-600">{button.description}</p>
                                  </div>
                                </div>
                              </Link>
                            </CardContent>
                          </Card>
                        ))}
                      </div>

                      {/* Second Row */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {actionButtons.slice(3, 6).map((button) => (
                          <Card
                            key={button.label}
                            className="group hover:shadow-lg transition-all duration-300 border-slate-200 hover:border-blue-300"
                          >
                            <CardContent className="p-4">
                              <Link href={button.href}>
                                <div
                                  className={`flex flex-col items-center text-center space-y-3 transition-all duration-200 hover:scale-105 ${
                                    activeButton === button.label ? "scale-95" : ""
                                  }`}
                                  onClick={() => handleButtonClick(button.label)}
                                >
                                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                                    <button.icon className="h-6 w-6 text-white" />
                                  </div>
                                  <div>
                                    <h3 className="font-semibold text-slate-900 text-sm mb-1">{button.label}</h3>
                                    <p className="text-xs text-slate-600">{button.description}</p>
                                  </div>
                                </div>
                              </Link>
                            </CardContent>
                          </Card>
                        ))}
                      </div>

                      {/* Third Row */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {actionButtons.slice(6, 8).map((button) => (
                          <Card
                            key={button.label}
                            className="group hover:shadow-lg transition-all duration-300 border-slate-200 hover:border-blue-300"
                          >
                            <CardContent className="p-4">
                              <Link href={button.href}>
                                <div
                                  className={`flex flex-col items-center text-center space-y-3 transition-all duration-200 hover:scale-105 ${
                                    activeButton === button.label ? "scale-95" : ""
                                  }`}
                                  onClick={() => handleButtonClick(button.label)}
                                >
                                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                                    <button.icon className="h-6 w-6 text-white" />
                                  </div>
                                  <div>
                                    <h3 className="font-semibold text-slate-900 text-sm mb-1">{button.label}</h3>
                                    <p className="text-xs text-slate-600">{button.description}</p>
                                  </div>
                                </div>
                              </Link>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Content - Background Image */}
                <div className="relative hidden lg:block">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
                    <div className="flex items-center justify-center h-full p-8">
                      <div className="text-center">
                        <div className="w-32 h-32 bg-white rounded-2xl shadow-xl mx-auto mb-6 flex items-center justify-center">
                          <BarChart3 className="h-16 w-16 text-blue-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">Portfolio Analytics</h3>
                        <p className="text-slate-600">Track performance and engagement</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
