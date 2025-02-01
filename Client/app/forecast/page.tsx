"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axiosInstance from "@/utils/axios";

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

export default function ForecastPage() {
  const [selectedState, setSelectedState] = useState<string>("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<any>(false);

  const fetchData = async (state: string) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(`http://127.0.0.1:8000/api/`, {
        location: state,
      });
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleStateChange = (state: string) => {
    setSelectedState(state);
    fetchData(state);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mt-8">
        Individual Product Demand Forecasts
      </h2>

      <div className="flex items-center space-x-4">
        <span>State:</span>
        <Select value={selectedState} onValueChange={handleStateChange}>
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
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product Name</TableHead>
              <TableHead>Current Stock</TableHead>
              <TableHead>Predicted Demand</TableHead>
              <TableHead>Diffrance</TableHead>
            </TableRow>
          </TableHeader>
          {/* <TableBody>
          {products.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.stock}</TableCell>
              <TableCell>{item.predictedDemand}</TableCell>
              <TableCell>{item.percentageChange}%</TableCell>
            </TableRow>
          ))}
        </TableBody> */}
        </Table>
      )}
    </div>
  );
}
