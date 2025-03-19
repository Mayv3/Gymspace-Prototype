"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { X, Plus } from "lucide-react"

export function PlanForm({ plan, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    features: [""],
    popular: false,
  })

  useEffect(() => {
    if (plan) {
      setFormData({
        name: plan.name,
        description: plan.description,
        price: plan.price.toString(),
        features: [...plan.features],
        popular: plan.popular,
      })
    }
  }, [plan])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleFeatureChange = (index, value) => {
    const updatedFeatures = [...formData.features]
    updatedFeatures[index] = value
    setFormData((prev) => ({
      ...prev,
      features: updatedFeatures,
    }))
  }

  const addFeature = () => {
    setFormData((prev) => ({
      ...prev,
      features: [...prev.features, ""],
    }))
  }

  const removeFeature = (index) => {
    if (formData.features.length > 1) {
      const updatedFeatures = [...formData.features]
      updatedFeatures.splice(index, 1)
      setFormData((prev) => ({
        ...prev,
        features: updatedFeatures,
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Filter out empty features
    const filteredFeatures = formData.features.filter((feature) => feature.trim() !== "")

    const submittedData = {
      ...formData,
      price: Number.parseFloat(formData.price),
      features: filteredFeatures,
    }

    // Here you would typically save the data to your backend
    console.log("Form submitted:", submittedData)
    onClose()
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>{plan ? "Editar Plan" : "Añadir Nuevo Plan"}</DialogTitle>
          <DialogDescription>
            {plan ? "Actualiza los detalles del plan aquí." : "Completa los detalles para añadir un nuevo plan."}
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
              <Label htmlFor="description" className="sm:text-right">
                Descripción
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="col-span-1 sm:col-span-3"
                required
              />
            </div>

            <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-4 sm:gap-4">
              <Label htmlFor="price" className="sm:text-right">
                Precio ($/mes)
              </Label>
              <Input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                className="col-span-1 sm:col-span-3"
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-4 sm:gap-4">
              <Label className="mt-2 sm:text-right">Características</Label>
              <div className="col-span-1 space-y-2 sm:col-span-3">
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={feature}
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                      placeholder={`Característica ${index + 1}`}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeFeature(index)}
                      disabled={formData.features.length <= 1}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={addFeature} className="mt-2">
                  <Plus className="mr-2 h-4 w-4" />
                  Añadir Característica
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-4 sm:gap-4">
              <Label htmlFor="popular" className="sm:text-right">
                Plan Popular
              </Label>
              <div className="flex items-center space-x-2">
                <Switch
                  id="popular"
                  name="popular"
                  checked={formData.popular}
                  onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, popular: checked }))}
                />
                <Label htmlFor="popular" className="text-sm text-muted-foreground">
                  Marcar como plan destacado
                </Label>
              </div>
            </div>
          </div>
          <DialogFooter className="flex-col gap-2 sm:flex-row">
            <Button type="button" variant="outline" onClick={onClose} className="w-full sm:w-auto">
              Cancelar
            </Button>
            <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 sm:w-auto">
              {plan ? "Guardar Cambios" : "Añadir Plan"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

