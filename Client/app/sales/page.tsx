"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Sale = {
  id: number
  store: string
  product: string
  quantity: number
  revenue: number
}

type CompletedNotification = {
  id: number
  retailer: string
  product: string
  quantity: number
  date: string
}

const initialSalesData: Sale[] = [
  { id: 1, store: "Vyom Computer", product: "Vostro 14", quantity: 14, revenue: 4999.5 },
  { id: 2, store: "Dell Store", product: "XPS 13", quantity: 12, revenue: 1499.7 },
  { id: 3, store: "Mohit Cpmputers", product: "Vostro 14", quantity: 20, revenue: 2999.8 },
]

export default function SalesPage() {
  const [salesData, setSalesData] = useState<Sale[]>(initialSalesData)
  const [completedNotifications, setCompletedNotifications] = useState<CompletedNotification[]>([])

  useEffect(() => {
    // In a real application, you would fetch this data from your API
    const mockCompletedNotifications: CompletedNotification[] = [
      { id: 1, retailer: "Vyom Computers", product: "Vostro 14", quantity: 15, date: "2023-04-16" },
      { id: 2, retailer: "Mohit Computers", product: "Vostro 14", quantity: 12, date: "2023-04-17" },
    ]
    setCompletedNotifications(mockCompletedNotifications)

    // Update sales data with completed notifications
    // const updatedSalesData = [...salesData]
    // mockCompletedNotifications.forEach((notification) => {
    //   const saleIndex = updatedSalesData.findIndex(
    //     (sale) => sale.store === notification.retailer && sale.product === notification.product,
    //   )
    //   if (saleIndex !== -1) {
    //     updatedSalesData[saleIndex].quantity += notification.quantity
    //     updatedSalesData[saleIndex].revenue += notification.quantity * 100 // Assuming $100 per unit for simplicity
    //   } else {
    //     updatedSalesData.push({
    //       id: updatedSalesData.length + 1,
    //       store: notification.retailer,
    //       product: notification.product,
    //       quantity: notification.quantity,
    //       revenue: notification.quantity * 100,
    //     })
    //   }
    // })
    // setSalesData(updatedSalesData)
  }, []) // Added salesData to the dependency array

  const totalRevenue = salesData.reduce((sum, sale) => sum + sale.revenue, 0)
  const totalQuantity = salesData.reduce((sum, sale) => sum + sale.quantity, 0)

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Sales Reports</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRevenue.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Units Sold</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalQuantity}</div>
          </CardContent>
        </Card>
      </div>
      <h2 className="text-2xl font-bold mt-8">Sales Data</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Store</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Quantity Sold</TableHead>
            <TableHead>Revenue</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {salesData.map((sale) => (
            <TableRow key={sale.id}>
              <TableCell>{sale.store}</TableCell>
              <TableCell>{sale.product}</TableCell>
              <TableCell>{sale.quantity}</TableCell>
              <TableCell>{sale.revenue.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <h2 className="text-2xl font-bold mt-8">Completed Notifications</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Retailer</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {completedNotifications.map((notification) => (
            <TableRow key={notification.id}>
              <TableCell>{notification.retailer}</TableCell>
              <TableCell>{notification.product}</TableCell>
              <TableCell>{notification.quantity}</TableCell>
              <TableCell>{notification.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

