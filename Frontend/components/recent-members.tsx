import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const recentMembers = [
  {
    name: "Juan Pérez",
    email: "juan@example.com",
    date: "Hace 2 días",
  },
  {
    name: "María García",
    email: "maria@example.com",
    date: "Hace 3 días",
  },
  {
    name: "Carlos López",
    email: "carlos@example.com",
    date: "Hace 5 días",
  },
  {
    name: "Ana Martínez",
    email: "ana@example.com",
    date: "Hace 1 semana",
  },
  {
    name: "Roberto Sánchez",
    email: "roberto@example.com",
    date: "Hace 1 semana",
  },
]

export function RecentMembers() {
  return (
    <div className="space-y-4 sm:space-y-8">
      {recentMembers.map((member) => (
        <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap sm:gap-0" key={member.email}>
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-orange-100 text-orange-800">
              {member.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="ml-0 space-y-1 sm:ml-4">
            <p className="text-sm font-medium leading-none">{member.name}</p>
            <p className="text-xs text-muted-foreground sm:text-sm">{member.email}</p>
          </div>
          <div className="ml-auto font-medium text-xs text-muted-foreground sm:text-sm">{member.date}</div>
        </div>
      ))}
    </div>
  )
}

