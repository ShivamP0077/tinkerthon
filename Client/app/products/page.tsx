"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Minus } from "lucide-react"

type Product = {
  id: number
  name: string
  category: string
  stock: number
  price: number
}

const initialProducts: Product[] = [
  { id: 1, name: "Product A", category: "Electronics", stock: 50, price: 99.99 },
  { id: 2, name: "Product B", category: "Clothing", stock: 100, price: 49.99 },
  { id: 3, name: "Product C", category: "Home", stock: 25, price: 149.99 },
]

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    name: "",
    category: "",
    stock: 0,
    price: 0,
  })

  const handleAddProduct = () => {
    setProducts([...products, { ...newProduct, id: products.length + 1 }])
    setNewProduct({ name: "", category: "", stock: 0, price: 0 })
  }

  const handleUpdateStock = (id: number, increment: boolean) => {
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, stock: product.stock + (increment ? 1 : -1) } : product,
      ),
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Products & Inventory</h1>
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Add New Product</h2>
        <div className="flex space-x-2">
          <Input
            placeholder="Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          />
          <Input
            placeholder="Category"
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
          />
          <Input
            type="number"
            placeholder="Stock"
            value={newProduct.stock}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                stock: Number.parseInt(e.target.value) || 0,
              })
            }
          />
          <Input
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                price: Number.parseFloat(e.target.value) || 0,
              })
            }
          />
          <Button onClick={handleAddProduct}>Add Product</Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>${product.price.toFixed(2)}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" onClick={() => handleUpdateStock(product.id, true)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleUpdateStock(product.id, false)}>
                    <Minus className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

