"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Mail, Upload, FileText, X, Check } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function EmailForm({ recipient, onClose }) {
  const [formData, setFormData] = useState({
    to: recipient?.email || "",
    subject: "",
    message: "",
    attachments: [],
  })
  const [activeTab, setActiveTab] = useState("upload")
  const [sending, setSending] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    setFormData((prev) => ({
      ...prev,
      attachments: [...prev.attachments, ...files],
    }))
  }

  const removeFile = (index) => {
    const updatedFiles = [...formData.attachments]
    updatedFiles.splice(index, 1)
    setFormData((prev) => ({
      ...prev,
      attachments: updatedFiles,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSending(true)

    // Simulate sending email
    setTimeout(() => {
      setSending(false)
      setSuccess(true)

      // Close after showing success message
      setTimeout(() => {
        onClose()
      }, 1500)
    }, 2000)

    console.log("Email data:", formData)
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Mail className="h-5 w-5 text-orange-500 text-white" />
            Enviar Email
          </DialogTitle>
          <DialogDescription>Envía un email con archivos PDF adjuntos al miembro seleccionado.</DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="mb-4 rounded-full bg-green-100 p-3">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-green-600">¡Email enviado correctamente!</h3>
            <p className="text-center text-muted-foreground">El email ha sido enviado a {formData.to}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="to" className="text-right">
                  Destinatario
                </Label>
                <Input
                  id="to"
                  name="to"
                  type="email"
                  value={formData.to}
                  onChange={handleChange}
                  className="col-span-3"
                  placeholder="correo@ejemplo.com"
                  required
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="subject" className="text-right">
                  Asunto
                </Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="col-span-3"
                  placeholder="Asunto del email"
                  required
                />
              </div>

              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="message" className="text-right pt-2">
                  Mensaje
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="col-span-3 min-h-[120px]"
                  placeholder="Escribe tu mensaje aquí..."
                  required
                />
              </div>

              <div className="grid grid-cols-4 items-start gap-4">
                <Label className="text-right pt-2">Adjuntos</Label>
                <div className="col-span-3">
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="upload">Subir PDF</TabsTrigger>
                      <TabsTrigger value="generate">Generar PDF</TabsTrigger>
                    </TabsList>

                    <TabsContent value="upload" className="space-y-4">
                      <div className="mt-2 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6 transition-all hover:border-orange-400">
                        <Upload className="mb-2 h-8 w-8 text-gray-400" />
                        <p className="mb-2 text-sm font-medium">Arrastra y suelta archivos PDF aquí</p>
                        <p className="mb-2 text-xs text-gray-500">O</p>
                        <label className="cursor-pointer rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600">
                          Seleccionar archivos
                          <input type="file" accept=".pdf" multiple className="hidden" onChange={handleFileChange} />
                        </label>
                      </div>
                    </TabsContent>

                    <TabsContent value="generate" className="space-y-4">
                      <div className="rounded-lg border p-4">
                        <div className="mb-4 flex items-center gap-2">
                          <FileText className="h-5 w-5 text-orange-500" />
                          <h3 className="font-medium">Generar PDF de Membresía</h3>
                        </div>
                        <p className="mb-4 text-sm text-muted-foreground">
                          Genera un PDF con los detalles de la membresía del usuario, incluyendo fechas, plan y pagos.
                        </p>
                        <Button
                          type="button"
                          className="w-full bg-orange-500 hover:bg-orange-600"
                          onClick={() => {
                            // Simulate generating a PDF
                            const mockPdf = new File([""], "membresia.pdf", { type: "application/pdf" })
                            setFormData((prev) => ({
                              ...prev,
                              attachments: [...prev.attachments, mockPdf],
                            }))
                          }}
                        >
                          Generar PDF de Membresía
                        </Button>
                      </div>

                      <div className="rounded-lg border p-4">
                        <div className="mb-4 flex items-center gap-2">
                          <FileText className="h-5 w-5 text-orange-500" />
                          <h3 className="font-medium">Generar Factura</h3>
                        </div>
                        <p className="mb-4 text-sm text-muted-foreground">
                          Genera una factura en PDF con los detalles de pago del usuario.
                        </p>
                        <Button
                          type="button"
                          className="w-full bg-orange-500 hover:bg-orange-600"
                          onClick={() => {
                            // Simulate generating a PDF
                            const mockPdf = new File([""], "factura.pdf", { type: "application/pdf" })
                            setFormData((prev) => ({
                              ...prev,
                              attachments: [...prev.attachments, mockPdf],
                            }))
                          }}
                        >
                          Generar Factura
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>

                  {formData.attachments.length > 0 && (
                    <div className="mt-4">
                      <h4 className="mb-2 text-sm font-medium">Archivos adjuntos:</h4>
                      <ul className="space-y-2">
                        {formData.attachments.map((file, index) => (
                          <li
                            key={index}
                            className="flex items-center justify-between rounded-md border bg-gray-50 p-2 text-sm"
                          >
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-orange-500" />
                              <span>{file.name}</span>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(index)}
                              className="h-6 w-6 p-0 text-gray-500 hover:text-red-500"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <DialogFooter className="flex-col gap-2 sm:flex-row">
              <Button type="button" variant="outline" onClick={onClose} className="w-full sm:w-auto">
                Cancelar
              </Button>
              <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 sm:w-auto" disabled={sending}>
                {sending ? (
                  <>
                    <svg
                      className="mr-2 h-4 w-4 animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Enviando...
                  </>
                ) : (
                  <>
                    <Mail className="mr-2 h-4 w-4 text-white" />
                    <p className="text-white">
                    Enviar Email
                    </p>
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}

