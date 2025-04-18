"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { BarChart3, TrendingUp, Users, Home, Settings, HelpCircle } from "lucide-react"

const routes = [
  {
    name: "Dashboard",
    path: "/",
    icon: Home,
  },
  {
    name: "Top Users",
    path: "/top-users",
    icon: Users,
  },
  {
    name: "Trending",
    path: "/trending",
    icon: TrendingUp,
  },
  {
    name: "Feed",
    path: "/feed",
    icon: BarChart3,
  },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden border-r bg-muted/40 md:block md:w-64 lg:w-72">
      <div className="flex h-full flex-col">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <BarChart3 className="h-6 w-6" />
            <span>Social Analytics</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {routes.map((route) => (
              <Button
                key={route.path}
                asChild
                variant={pathname === route.path ? "secondary" : "ghost"}
                className="justify-start h-9"
              >
                <Link href={route.path}>
                  <route.icon className="mr-2 h-4 w-4" />
                  {route.name}
                </Link>
              </Button>
            ))}
            <div className="mt-auto">
              <Button variant="ghost" className="justify-start h-9 w-full mt-6">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
              <Button variant="ghost" className="justify-start h-9 w-full">
                <HelpCircle className="mr-2 h-4 w-4" />
                Help
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </div>
  )
}
