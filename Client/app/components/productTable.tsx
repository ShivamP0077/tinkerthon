import { useState } from "react";
import axios from "axios";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
];

const ProductTable = ({ products, fetchProducts }: any) => {
  const [selectedState, setSelectedState] = useState<string>("");
  const [editableStock, setEditableStock] = useState<any>({});
  const [saleDialogOpen, setSaleDialogOpen] = useState<boolean>(false);
  const [selectedProductForSale, setSelectedProductForSale] =
    useState<any>(null);
  const [saleQuantity, setSaleQuantity] = useState<number>(1);

  const handleStockChange = (productId: any, value: any) => {
    setEditableStock((prev: any) => ({
      ...prev,
      [productId]: value,
    }));
  };

  const handleStockUpdate = async (productId: any) => {
    try {
      const newStock =
        editableStock[productId] ??
        products.find((p: any) => p.id === productId)?.stock;

      await axios.post("http://127.0.0.1:8000/api/update-stock/", {
        productId,
        stock: newStock,
      });
      // Refresh product data
    } catch (error) {
      console.error("Error updating stock:", error);
    }
  };

  const handleStockSale = async () => {
    if (!selectedProductForSale || saleQuantity <= 0) return;

    console.log(selectedProductForSale.id, saleQuantity);

    try {
      await axios.post("http://127.0.0.1:8000/api/sell-stock/", {
        productId: selectedProductForSale.id,
        quantity: saleQuantity,
        location: selectedState,
      });

      setSaleDialogOpen(false);
      setSaleQuantity(1);
      setSelectedProductForSale(null);
    } catch (error) {
      console.error("Error processing sale:", error);
    }
  };

  const openSaleDialog = (product: any) => {
    setSelectedProductForSale(product);
    setSaleDialogOpen(true);
    setSaleQuantity(1);
    setSelectedState("");
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Brand</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Update Stock</TableHead>
            <TableHead>Sell Stock</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product: any) => (
            <TableRow key={product.id}>
              <TableCell>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-12 h-12 object-cover rounded"
                />
              </TableCell>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{product.brand}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell className="max-w-xs">
                <p className="truncate">{product.description}</p>
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  value={editableStock[product.id] ?? product.stock}
                  onChange={(e) =>
                    handleStockChange(product.id, e.target.value)
                  }
                  className="w-20 text-center"
                />
              </TableCell>
              <TableCell>${product.price}</TableCell>
              <TableCell>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handleStockUpdate(product.id)}
                >
                  Edit Stock
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => openSaleDialog(product)}
                >
                  Sell Stock
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={saleDialogOpen} onOpenChange={setSaleDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sell Stock</DialogTitle>
            <DialogDescription>
              Sell stock for {selectedProductForSale?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-4">
            <span>Quantity:</span>
            <Input
              type="number"
              value={saleQuantity}
              min={1}
              max={selectedProductForSale?.stock}
              onChange={(e) => setSaleQuantity(Number(e.target.value))}
              className="w-20"
            />
          </div>
          <div className="flex items-center space-x-4">
            <span>State:</span>
            <Select value={selectedState} onValueChange={setSelectedState}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a state" />
              </SelectTrigger>
              <SelectContent>
                {INDIAN_STATES.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSaleDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleStockSale}
              disabled={saleQuantity > (selectedProductForSale?.stock || 0)}
            >
              Confirm Sale
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductTable;
