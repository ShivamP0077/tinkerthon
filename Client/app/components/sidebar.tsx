import Link from "next/link"
import { Package, Bell, BarChart2, TrendingUp, LayoutDashboard } from "lucide-react"

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Products", href: "/products", icon: Package },
  { name: "Notifications", href: "/notifications", icon: Bell },
  { name: "Sales", href: "/sales", icon: BarChart2 },
  { name: "Demand Forecast", href: "/forecast", icon: TrendingUp },
]

export function Sidebar() {
  return (
    <div className="flex h-full w-64 flex-col bg-gray-800 text-white">
      <div className="p-4">
       <Link href="/"> <h1 className="text-2xl font-bold">AscendX</h1> </Link> 
      </div>
      <nav className="flex-1">
        <ul>
          {navItems.map((item) => (
            <li key={item.name}>
              <Link href={item.href} className="flex items-center px-4 py-2 hover:bg-gray-700">
                <item.icon className="mr-2 h-5 w-5" />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

