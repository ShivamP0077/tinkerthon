"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type Notification = {
  id: number
  retailer: string
  product: string
  currentStock: number
  requiredStock: number
  date: string
  status: "Pending" | "Completed"
}

const initialNotifications: Notification[] = [
  {
    id: 1,
    retailer: "Store A",
    product: "Product X",
    currentStock: 5,
    requiredStock: 20,
    date: "2023-04-15",
    status: "Pending",
  },
  {
    id: 2,
    retailer: "Store B",
    product: "Product Y",
    currentStock: 3,
    requiredStock: 15,
    date: "2023-04-14",
    status: "Pending",
  },
  {
    id: 3,
    retailer: "Store C",
    product: "Product Z",
    currentStock: 2,
    requiredStock: 10,
    date: "2023-04-13",
    status: "Pending",
  },
]

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)

  const handleComplete = (id: number) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, status: "Completed" } : notification,
      ),
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Low Stock Notifications</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Retailer</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Current Stock</TableHead>
            <TableHead>Required Stock</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {notifications.map((notification) => (
            <TableRow key={notification.id}>
              <TableCell>{notification.retailer}</TableCell>
              <TableCell>{notification.product}</TableCell>
              <TableCell>{notification.currentStock}</TableCell>
              <TableCell>{notification.requiredStock}</TableCell>
              <TableCell>{notification.date}</TableCell>
              <TableCell>
                <Badge variant={notification.status === "Completed" ? "success" : "destructive"}>
                  {notification.status}
                </Badge>
              </TableCell>
              <TableCell>
                {notification.status === "Pending" && (
                  <Button onClick={() => handleComplete(notification.id)}>Mark as Complete</Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

