import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function About() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">About InventoryPro</h1>
      <div className="max-w-3xl mx-auto space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              At InventoryPro, we're committed to revolutionizing inventory management for businesses of all sizes. Our
              mission is to provide cutting-edge tools and insights that empower companies to optimize their stock
              levels, reduce waste, and increase profitability.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>What We Offer</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-6 space-y-2">
              <li>Comprehensive inventory tracking and management</li>
              <li>Real-time low-stock notifications from retailers</li>
              <li>Sales tracking and reporting across multiple stores</li>
              <li>AI-powered demand forecasting for informed decision-making</li>
              <li>User-friendly web dashboard for easy access to all features</li>
              <li>Mobile app for on-the-go inventory management (coming soon)</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Why Choose InventoryPro?</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Our platform combines ease of use with powerful features, making it the ideal choice for businesses
              looking to streamline their inventory processes. With InventoryPro, you'll benefit from:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Increased efficiency in stock management</li>
              <li>Reduced inventory costs and waste</li>
              <li>Improved communication with retail partners</li>
              <li>Data-driven insights for better business decisions</li>
              <li>Scalable solutions that grow with your business</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

