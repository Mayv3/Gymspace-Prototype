"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function UserForm({ user, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    startDate: "",
    endDate: "",
  })

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        phone: user.phone,
        startDate: user.startDate,
        endDate: user.endDate,
      })
    }
  }, [user])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically save the data to your backend
    console.log("Form submitted:", formData)
    onClose()
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{user ? "Editar Miembro" : "Añadir Nuevo Miembro"}</DialogTitle>
          <DialogDescription>
            {user ? "Actualiza los datos del miembro aquí." : "Completa los datos para añadir un nuevo miembro."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-4 sm:gap-4">
              <Label htmlFor="name" className="sm:text-right">
                Nombre
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="col-span-1 sm:col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-4 sm:gap-4">
              <Label htmlFor="phone" className="sm:text-right">
                Teléfono
              </Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="col-span-1 sm:col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-4 sm:gap-4">
              <Label htmlFor="startDate" className="sm:text-right">
                Inicio
              </Label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
                className="col-span-1 sm:col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-4 sm:gap-4">
              <Label htmlFor="endDate" className="sm:text-right">
                Fin
              </Label>
              <Input
                id="endDate"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleChange}
                className="col-span-1 sm:col-span-3"
                required
              />
            </div>
          </div>
          <DialogFooter className="flex-col gap-2 sm:flex-row">
            <Button type="button" variant="outline" onClick={onClose} className="w-full sm:w-auto">
              Cancelar
            </Button>
            <Button type="submit" className="w-full text-white bg-orange-500 hover:bg-orange-600 sm:w-auto">
              {user ? "Guardar Cambios" : "Añadir Miembro"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

