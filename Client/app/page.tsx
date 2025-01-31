import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Download } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-gray-50 text-center">
      <h1 className="text-5xl font-bold mb-6">Welcome to AscendX</h1>
      <p className="text-xl mb-8 max-w-2xl">
        Streamline your inventory management with our powerful tools and AI-driven insights.
      </p>
      <div className="flex gap-4 mb-12">
        <Button asChild>
          <Link href="/dashboard">
            For Organization <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        <Button variant="outline">
          Download App <Download className="ml-2 h-4 w-4" />
        </Button>
      </div>
      <div className="grid md:grid-cols-3 gap-8 max-w-4xl">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Smart Inventory Management</h2>
          <p>Efficiently manage your stock levels and product details with our intuitive interface.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Real-time Notifications</h2>
          <p>Stay informed with instant low-stock alerts and updates from your retail partners.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">AI-Powered Forecasting</h2>
          <p>Make data-driven decisions with our advanced demand prediction algorithms.</p>
        </div>
      </div>
    </div>
  )
}

