"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import axiosInstance from "@/utils/axios"
import ProductTable from "../components/productTable"


type Product = {
  id: number;
  name: string;
  brand: string;
  category: string;
  description: string;
  stock: number;
  price: number;
  imageUrl: string;
};

export default function ProductsPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [show, setShow] = useState<boolean>(false);

  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    name: "",
    brand: "",
    category: "",
    description: "",
    stock: 0,
    price: 0,
    imageUrl: "",
  });

  const handleAddProduct =async () => {

    setLoading(true);
    try {
      console.log(newProduct);
      
      const response = await axiosInstance.post('http://127.0.0.1:8000/api/add/',{
        name: newProduct.name,
        brand: newProduct.brand,
        category: newProduct.category,
        description : newProduct.description,
        stock: newProduct.stock,
        price: newProduct.price,
        image_url: newProduct.imageUrl
      });
      console.log(response);
      setError(null);
      setLoading(false);
      setProducts([...products, { ...newProduct, id: products.length + 1 }]);
      setNewProduct({
        name: "",
        brand: "",
        category: "",
        description: "",
        stock: 0,
        price: 0,
        imageUrl: "",
      });
    } catch (err : any) {
      setError(err.response?.data || 'Something went wrong');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('http://127.0.0.1:8000/api/all/'); 
        console.log(response.data);
        
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleUpdateStock = (id: number, increment: boolean) => {
    setProducts(
      products.map((product) =>
        product.id === id
          ? { ...product, stock: product.stock + (increment ? 1 : -1) }
          : product
      )
    );
  };

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">Products & Inventory</h1>
      <div className="flex justify-between">
        <Button
          onClick={() => {
            setShow(!show);
          }}
        >
          Add New Product
        </Button>
       <Link href="/forecast"><Button>Demand Forecast</Button></Link>
      </div>

      {show ? (
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <Input
                  placeholder="Name"
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                />
                <Input
                  placeholder="Brand"
                  value={newProduct.brand}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, brand: e.target.value })
                  }
                />
                <Input
                  placeholder="Category"
                  value={newProduct.category}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, category: e.target.value })
                  }
                />
                <div className="flex justify-center gap-2 items-center text-sm">
                  Stock
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
                </div>
                <div className="flex justify-center gap-2 items-center text-sm">
                  Price
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
                </div>
              </div>
              <div className="space-y-4">
                <Textarea
                  placeholder="Product Description"
                  className="h-32"
                  value={newProduct.description}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      description: e.target.value,
                    })
                  }
                />
                <Input
                  placeholder="Image URL"
                  value={newProduct.imageUrl}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, imageUrl: e.target.value })
                  }
                />
                <Button onClick={handleAddProduct} className="w-full">
                  Add Product
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        ""
      )}

      <ProductTable products={products} ></ProductTable>

   
    </div>
  );
}
