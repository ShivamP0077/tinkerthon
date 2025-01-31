import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const forecastData = [
  { id: 1, product: "Product X", currentDemand: 100, predictedDemand: 120, percentageChange: 20 },
  { id: 2, product: "Product Y", currentDemand: 80, predictedDemand: 75, percentageChange: -6.25 },
  { id: 3, product: "Product Z", currentDemand: 50, predictedDemand: 60, percentageChange: 20 },
]

export default function ForecastPage() {
  const averageDemandChange = (
    forecastData.reduce((sum, item) => sum + item.percentageChange, 0) / forecastData.length
  ).toFixed(2)
  const highestDemandIncrease = Math.max(...forecastData.map((item) => item.percentageChange))
  const lowestDemandChange = Math.min(...forecastData.map((item) => item.percentageChange))

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Demand Forecast</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Demand Change</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageDemandChange}%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Highest Demand Increase</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{highestDemandIncrease}%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Lowest Demand Change</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lowestDemandChange}%</div>
          </CardContent>
        </Card>
      </div>
      <h2 className="text-2xl font-bold mt-8">Individual Product Forecasts</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Current Demand</TableHead>
            <TableHead>Predicted Demand</TableHead>
            <TableHead>Percentage Change</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {forecastData.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.product}</TableCell>
              <TableCell>{item.currentDemand}</TableCell>
              <TableCell>{item.predictedDemand}</TableCell>
              <TableCell>{item.percentageChange}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

