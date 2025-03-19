"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from "@/components/overview"
import { RecentMembers } from "@/components/recent-members"
import { UserTable } from "@/components/user-table"
import {
  DollarSign,
  Users,
  Calendar,
  TrendingUp,
  Menu,
  Bell,
  User,
  LogOut,
  Settings,
  LayoutDashboard,
  Dumbbell,
  CreditCard,
  FileText,
} from "lucide-react"
import { UserForm } from "@/components/user-form"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { PlanTable } from "@/components/plan-table"
import { PlanForm } from "@/components/plan-form"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EmailForm } from "@/components/email-form"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Dashboard() {
  const [showUserForm, setShowUserForm] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [showPlanForm, setShowPlanForm] = useState(false)
  const [editingPlan, setEditingPlan] = useState(null)
  const [showEmailForm, setShowEmailForm] = useState(false)
  const [emailRecipient, setEmailRecipient] = useState(null)
  const [currentTab, setCurrentTab] = useState("overview")
  const [greeting, setGreeting] = useState("")

  useEffect(() => {
    const hours = new Date().getHours()
    if (hours < 12) {
      setGreeting("Buenos días TODOS PUTOS")
    } else if (hours < 18) {
      setGreeting("Buenas tardes")
    } else {
      setGreeting("Buenas noches")
    }
  }, [])

  const handleAddUser = () => {
    setEditingUser(null)
    setShowUserForm(true)
  }

  const handleEditUser = (user) => {
    setEditingUser(user)
    setShowUserForm(true)
  }

  const handleCloseForm = () => {
    setShowUserForm(false)
    setEditingUser(null)
  }

  const handleAddPlan = () => {
    setEditingPlan(null)
    setShowPlanForm(true)
  }

  const handleEditPlan = (plan) => {
    setEditingPlan(plan)
    setShowPlanForm(true)
  }

  const handleClosePlanForm = () => {
    setShowPlanForm(false)
    setEditingPlan(null)
  }

  const handleSendEmail = (user = null) => {
    setEmailRecipient(user)
    setShowEmailForm(true)
  }

  const handleCloseEmailForm = () => {
    setShowEmailForm(false)
    setEmailRecipient(null)
  }

  return (
    <ThemeProvider attribute="class">
      <div className="flex min-h-screen flex-col bg-background">
        <header className="sticky top-0 z-30 border-b bg-white dark:bg-card shadow-sm dark:border-white/10">
          <div className="flex h-16 items-center px-4 sm:px-6">
            <div className="flex items-center gap-2">
              <Dumbbell className="h-8 w-8 text-orange-500" />
              <span className="text-xl font-bold text-orange-500 sm:text-2xl">GymSpace</span>
            </div>

            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="ml-auto md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[240px] sm:w-[300px] border-r border-orange-100 bg-white dark:bg-card dark:border-white/10 p-0"
              >
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 border-b border-orange-100 dark:border-white/10 p-6">
                    <Dumbbell className="h-6 w-6 text-orange-500" />
                    <span className="text-xl font-bold text-orange-500">GymSpace</span>
                  </div>
                  <nav className="flex flex-col p-4">
                    <div className="mb-2 px-4 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                      General
                    </div>
                    <a
                      href="#"
                      className="mb-1 flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 dark:text-gray-200 transition-all hover:bg-orange-50 dark:hover:bg-orange-950/30 hover:text-orange-600 dark:hover:text-orange-500"
                      onClick={() => setCurrentTab("overview")}
                    >
                      <LayoutDashboard className="h-5 w-5" />
                      <span>Dashboard</span>
                    </a>
                    <a
                      href="#"
                      className="mb-1 flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 dark:text-gray-200 transition-all hover:bg-orange-50 dark:hover:bg-orange-950/30 hover:text-orange-600 dark:hover:text-orange-500"
                      onClick={() => setCurrentTab("members")}
                    >
                      <Users className="h-5 w-5" />
                      <span>Miembros</span>
                    </a>
                    <a
                      href="#"
                      className="mb-1 flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 dark:text-gray-200 transition-all hover:bg-orange-50 dark:hover:bg-orange-950/30 hover:text-orange-600 dark:hover:text-orange-500"
                      onClick={() => setCurrentTab("plans")}
                    >
                      <FileText className="h-5 w-5" />
                      <span>Planes</span>
                    </a>

                    <div className="my-2 px-4 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
                      Administración
                    </div>
                    <a
                      href="#"
                      className="mb-1 flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 dark:text-gray-200 transition-all hover:bg-orange-50 dark:hover:bg-orange-950/30 hover:text-orange-600 dark:hover:text-orange-500"
                    >
                      <CreditCard className="h-5 w-5" />
                      <span>Pagos</span>
                    </a>
                    <a
                      href="#"
                      className="mb-1 flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 dark:text-gray-200 transition-all hover:bg-orange-50 dark:hover:bg-orange-950/30 hover:text-orange-600 dark:hover:text-orange-500"
                    >
                      <Settings className="h-5 w-5" />
                      <span>Configuración</span>
                    </a>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>

            <div className="ml-auto flex items-center gap-4">
              <ThemeToggle />
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[10px] text-white">
                  3
                </span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Avatar" />
                      <AvatarFallback className="bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-200">
                        AD
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">Admin</p>
                      <p className="text-xs leading-none text-muted-foreground">admin@gymspace.com</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Perfil</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Configuración</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Cerrar sesión</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <div className="hidden border-b border-orange-100 dark:border-white/10 bg-white dark:bg-card px-6 py-3 md:block">
          <nav className="flex space-x-4">
            <a
              href="#"
              className={`flex items-center px-3 py-2 text-sm font-medium transition-colors ${
                currentTab === "overview"
                  ? "text-orange-600"
                  : "text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-500"
              }`}
              onClick={() => setCurrentTab("overview")}
            >
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </a>
            <a
              href="#"
              className={`flex items-center px-3 py-2 text-sm font-medium transition-colors ${
                currentTab === "members"
                  ? "text-orange-600"
                  : "text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-500"
              }`}
              onClick={() => setCurrentTab("members")}
            >
              <Users className="mr-2 h-4 w-4" />
              Miembros
            </a>
            <a
              href="#"
              className={`flex items-center px-3 py-2 text-sm font-medium transition-colors ${
                currentTab === "plans"
                  ? "text-orange-600"
                  : "text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-500"
              }`}
              onClick={() => setCurrentTab("plans")}
            >
              <FileText className="mr-2 h-4 w-4" />
              Planes
            </a>
          </nav>
        </div>

        <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-800 dark:text-white sm:text-3xl">
                {greeting}, Admin
              </h2>
              <p className="text-muted-foreground">Aquí tienes un resumen de tu gimnasio</p>
            </div>
          </div>

          <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-4">
            <TabsList className="hidden">
              <TabsTrigger value="overview">Vista General</TabsTrigger>
              <TabsTrigger value="members">Miembros</TabsTrigger>
              <TabsTrigger value="plans">Planes</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Card className="overflow-hidden border dark:border-white/10 shadow-md transition-all hover:shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 bg-gradient-to-r from-orange-500 to-orange-600 pb-2">
                    <CardTitle className="text-sm font-medium text-white">Total Miembros</CardTitle>
                    <div className="rounded-full bg-white/20 p-2">
                      <Users className="h-4 w-4 text-white" />
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold">245</div>
                    <p className="text-xs text-emerald-500 font-medium">+12% desde el mes pasado</p>
                  </CardContent>
                </Card>
                <Card className="overflow-hidden border dark:border-white/10 shadow-md transition-all hover:shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 bg-gradient-to-r from-blue-500 to-blue-600 pb-2">
                    <CardTitle className="text-sm font-medium text-white">Ingresos Mensuales</CardTitle>
                    <div className="rounded-full bg-white/20 p-2">
                      <DollarSign className="h-4 w-4 text-white" />
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold">$15,234</div>
                    <p className="text-xs text-emerald-500 font-medium">+2.1% desde el mes pasado</p>
                  </CardContent>
                </Card>
                <Card className="overflow-hidden border dark:border-white/10 shadow-md transition-all hover:shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 bg-gradient-to-r from-purple-500 to-purple-600 pb-2">
                    <CardTitle className="text-sm font-medium text-white">Nuevas Membresías</CardTitle>
                    <div className="rounded-full bg-white/20 p-2">
                      <Calendar className="h-4 w-4 text-white" />
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold">32</div>
                    <p className="text-xs text-emerald-500 font-medium">+18% desde el mes pasado</p>
                  </CardContent>
                </Card>
                <Card className="overflow-hidden border dark:border-white/10 shadow-md transition-all hover:shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 bg-gradient-to-r from-green-500 to-green-600 pb-2">
                    <CardTitle className="text-sm font-medium text-white">Renovaciones</CardTitle>
                    <div className="rounded-full bg-white/20 p-2">
                      <TrendingUp className="h-4 w-4 text-white" />
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold">85%</div>
                    <p className="text-xs text-emerald-500 font-medium">+5% desde el mes pasado</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-full border dark:border-white/10 shadow-md md:col-span-4">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Resumen Mensual</CardTitle>
                      <CardDescription>Ingresos mensuales del gimnasio</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <div className="h-3 w-3 rounded-full bg-orange-500"></div>
                        <span className="text-xs text-muted-foreground">Ingresos</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Overview />
                  </CardContent>
                </Card>
                <Card className="col-span-full border dark:border-white/10 shadow-md md:col-span-3">
                  <CardHeader>
                    <CardTitle>Miembros Recientes</CardTitle>
                    <CardDescription>Nuevos miembros este mes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentMembers />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="members" className="space-y-4">
              <UserTable onAddUser={handleAddUser} onEditUser={handleEditUser} onSendEmail={handleSendEmail} />
            </TabsContent>

            <TabsContent value="plans" className="space-y-4">
              <PlanTable onAddPlan={handleAddPlan} onEditPlan={handleEditPlan} />
            </TabsContent>
          </Tabs>
        </div>

        {showUserForm && <UserForm user={editingUser} onClose={handleCloseForm} />}
        {showPlanForm && <PlanForm plan={editingPlan} onClose={handleClosePlanForm} />}
        {showEmailForm && <EmailForm recipient={emailRecipient} onClose={handleCloseEmailForm} />}
      </div>
    </ThemeProvider>
  )
}

