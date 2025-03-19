"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Edit, MoreHorizontal, Plus, Search, Trash2, Mail } from "lucide-react"
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
const initialUsers = [
  {
    id: "1",
    name: "Juan Pérez",
    email: "juan@example.com",
    phone: "555-123-4567",
    startDate: "2023-01-15",
    endDate: "2023-07-15",
    status: "active",
  },
  {
    id: "2",
    name: "María García",
    email: "maria@example.com",
    phone: "555-234-5678",
    startDate: "2023-02-20",
    endDate: "2023-08-20",
    status: "active",
  },
  {
    id: "3",
    name: "Carlos López",
    email: "carlos@example.com",
    phone: "555-345-6789",
    startDate: "2023-03-10",
    endDate: "2023-09-10",
    status: "inactive",
  },
  {
    id: "4",
    name: "Ana Martínez",
    email: "ana@example.com",
    phone: "555-456-7890",
    startDate: "2023-04-05",
    endDate: "2023-10-05",
    status: "active",
  },
  {
    id: "5",
    name: "Roberto Sánchez",
    email: "roberto@example.com",
    phone: "555-567-8901",
    startDate: "2023-05-12",
    endDate: "2023-11-12",
    status: "pending",
  },
]

export function UserTable({ onAddUser, onEditUser, onSendEmail }) {
  const [users, setUsers] = useState(initialUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [userToDelete, setUserToDelete] = useState(null)

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  const handleDeleteUser = (user) => {
    setUserToDelete(user)
  }

  const confirmDelete = () => {
    if (userToDelete) {
      setUsers(users.filter((user) => user.id !== userToDelete.id))
      setUserToDelete(null)
    }
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500 hover:bg-green-600">Activo</Badge>
      case "inactive":
        return <Badge className="bg-red-500 hover:bg-red-600">Inactivo</Badge>
      case "pending":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Pendiente</Badge>
      default:
        return null
    }
  }

  // Mobile card view for each user
  const MobileUserCard = ({ user }) => (
    <Card className="mb-4 overflow-hidden border dark:border-white/10 shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{user.name}</CardTitle>
          {getStatusBadge(user.status)}
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid gap-2">
          <div className="grid grid-cols-2">
            <span className="text-sm font-medium text-muted-foreground">Email:</span>
            <span className="text-sm">{user.email}</span>
          </div>
          <div className="grid grid-cols-2">
            <span className="text-sm font-medium text-muted-foreground">Teléfono:</span>
            <span className="text-sm">{user.phone}</span>
          </div>
          <div className="grid grid-cols-2">
            <span className="text-sm font-medium text-muted-foreground">Inicio:</span>
            <span className="text-sm">{formatDate(user.startDate)}</span>
          </div>
          <div className="grid grid-cols-2">
            <span className="text-sm font-medium text-muted-foreground">Fin:</span>
            <span className="text-sm">{formatDate(user.endDate)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 border-t dark:border-white/10 bg-gray-50 dark:bg-secondary p-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onSendEmail(user)}
          className="h-8 w-8 p-0 text-blue-600 dark:text-blue-400"
        >
          <Mail className="h-4 w-4" />
          <span className="sr-only">Enviar Email</span>
        </Button>
        <Button variant="outline" size="sm" onClick={() => onEditUser(user)} className="h-8 w-8 p-0">
          <Edit className="h-4 w-4" />
          <span className="sr-only">Editar</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleDeleteUser(user)}
          className="h-8 w-8 p-0 text-red-600 dark:text-red-400"
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only">Eliminar</span>
        </Button>
      </CardFooter>
    </Card>
  )

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <h2 className="text-2xl font-bold">Miembros</h2>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar miembros..."
              className="w-full pl-8 sm:w-[200px] md:w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <Button onClick={onAddUser} className="bg-orange-500 hover:bg-orange-600 text-white">
          <Plus className="mr-2 h-4 w-4" />
          Añadir Miembro
        </Button>
      </div>

      {/* Mobile view */}
      <div className="md:hidden">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => <MobileUserCard key={user.id} user={user} />)
        ) : (
          <div className="rounded-md border dark:border-white/10 p-8 text-center">No se encontraron resultados.</div>
        )}
      </div>

      {/* Desktop view */}
      <div className="hidden md:block">
        <div className="rounded-md border dark:border-white/10 overflow-hidden shadow-md">
          <Table>
            <TableHeader className="bg-gray-50 dark:bg-secondary">
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Teléfono</TableHead>
                <TableHead>Inicio Membresía</TableHead>
                <TableHead>Fin Membresía</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow key={user.id} className="hover:bg-gray-50 dark:hover:bg-secondary/80 dark:border-white/10">
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{formatDate(user.startDate)}</TableCell>
                    <TableCell>{formatDate(user.endDate)}</TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onSendEmail(user)}
                          className="h-8 w-8 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 hover:text-blue-700"
                        >
                          <Mail className="h-4 w-4" />
                          <span className="sr-only">Enviar Email</span>
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Abrir menú</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => onEditUser(user)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-600 dark:text-red-400"
                              onClick={() => handleDeleteUser(user)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Eliminar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No se encontraron resultados.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={userToDelete !== null} onOpenChange={(open) => !open && setUserToDelete(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirmar eliminación</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas eliminar a {userToDelete?.name}? Esta acción no se puede deshacer.
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

