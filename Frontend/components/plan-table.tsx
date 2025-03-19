"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Edit, Plus, Search, Trash2, Check } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Sample data
const initialPlans = [
  {
    id: "1",
    name: "Dos veces por semana",
    description: "Acceso al gimnasio 2 días a la semana",
    price: 599,
    features: ["Acceso a equipos", "Casillero básico", "Horario limitado"],
    popular: false,
  },
  {
    id: "2",
    name: "Tres veces por semana",
    description: "Acceso al gimnasio 3 días a la semana",
    price: 799,
    features: ["Acceso a equipos", "Casillero básico", "1 clase grupal semanal"],
    popular: true,
  },
  {
    id: "3",
    name: "Plan Premium + Pase Libre",
    description: "Acceso ilimitado al gimnasio",
    price: 1299,
    features: ["Acceso ilimitado", "Casillero premium", "Clases ilimitadas", "Entrenador personal"],
    popular: false,
  },
]

export function PlanTable({ onAddPlan, onEditPlan }) {
  const [plans, setPlans] = useState(initialPlans)
  const [searchTerm, setSearchTerm] = useState("")
  const [planToDelete, setPlanToDelete] = useState(null)

  const handleDeletePlan = (plan) => {
    setPlanToDelete(plan)
  }

  const confirmDelete = () => {
    if (planToDelete) {
      setPlans(plans.filter((plan) => plan.id !== planToDelete.id))
      setPlanToDelete(null)
    }
  }

  const filteredPlans = plans.filter(
    (plan) =>
      plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Mobile card view for each plan
  const MobilePlanCard = ({ plan }) => (
    <Card className="mb-4 overflow-hidden border dark:border-white/10 shadow-md">
      <CardHeader className={`pb-2 ${plan.popular ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white" : ""}`}>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{plan.name}</CardTitle>
          {plan.popular && <Badge className="bg-white text-orange-600 hover:bg-gray-100">Popular</Badge>}
        </div>
      </CardHeader>
      <CardContent className="pb-2 pt-4">
        <div className="grid gap-2">
          <p className="text-sm text-muted-foreground">{plan.description}</p>
          <p className="text-3xl font-bold text-orange-500">
            ${plan.price} <span className="text-sm font-normal text-muted-foreground">/ mes</span>
          </p>
          <div className="mt-2">
            <p className="text-sm font-medium">Características:</p>
            <ul className="mt-2 space-y-2">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <Check className="mt-0.5 h-4 w-4 text-green-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 border-t dark:border-white/10 bg-gray-50 dark:bg-secondary p-2">
        <Button variant="outline" size="sm" onClick={() => onEditPlan(plan)} className="h-8 w-8 p-0">
          <Edit className="h-4 w-4" />
          <span className="sr-only">Editar</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleDeletePlan(plan)}
          className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-700"
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Eliminar</span>
        </Button>
      </CardFooter>
    </Card>
  )

  // Desktop card view for plans
  const DesktopPlanCards = () => (
    <div className="grid gap-4 md:grid-cols-3">
      {filteredPlans.map((plan) => (
        <Card
          key={plan.id}
          className={`overflow-hidden border dark:border-white/10 shadow-md transition-all hover:shadow-lg ${plan.popular ? "relative" : ""}`}
        >
          {plan.popular && (
            <div className="absolute -right-12 top-7 z-10 rotate-45 bg-orange-500 px-12 py-1 text-center text-xs font-semibold text-white">
              POPULAR
            </div>
          )}
          <CardHeader
            className={`pb-2 ${plan.popular ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white" : ""}`}
          >
            <CardTitle className="text-xl">{plan.name}</CardTitle>
            <p className={`text-sm ${plan.popular ? "text-orange-100" : "text-muted-foreground"}`}>
              {plan.description}
            </p>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="mb-4 text-center">
              <p className="text-4xl font-bold text-orange-500">${plan.price}</p>
              <p className="text-sm text-muted-foreground">por mes</p>
            </div>
            <ul className="space-y-2">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 text-green-500" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="flex justify-between gap-2 border-t dark:border-white/10 p-4">
            <Button variant="outline" size="sm" onClick={() => onEditPlan(plan)}>
              <Edit className="mr-2 h-4 w-4" />
              Editar
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDeletePlan(plan)}
              className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-700"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Eliminar
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <h2 className="text-2xl font-bold">Planes</h2>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar planes..."
              className="w-full pl-8 sm:w-[200px] md:w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <Button onClick={onAddPlan} className="bg-orange-500 hover:bg-orange-600">
          <Plus className="mr-2 h-4 w-4" />
          Añadir Plan
        </Button>
      </div>

      {/* Mobile view */}
      <div className="md:hidden">
        {filteredPlans.length > 0 ? (
          filteredPlans.map((plan) => <MobilePlanCard key={plan.id} plan={plan} />)
        ) : (
          <div className="rounded-md border dark:border-white/10 p-8 text-center">No se encontraron resultados.</div>
        )}
      </div>

      {/* Desktop view */}
      <div className="hidden md:block">
        {filteredPlans.length > 0 ? (
          <DesktopPlanCards />
        ) : (
          <div className="rounded-md border dark:border-white/10 p-8 text-center">No se encontraron resultados.</div>
        )}
      </div>

      <Dialog open={planToDelete !== null} onOpenChange={(open) => !open && setPlanToDelete(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirmar eliminación</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas eliminar el plan "{planToDelete?.name}"? Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button variant="destructive" onClick={confirmDelete}>
              Eliminar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

