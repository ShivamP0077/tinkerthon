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
  const [loading1, setLoading1] = useState<any>(false);
  const [graph, setGraph] = useState<string>("");

  const fetchData = async (state: string) => {
    setLoading(true);
    setLoading1(true);
    try {
      const response = await axiosInstance.post(
        `http://127.0.0.1:8000/api/preDemand/`,
        {
          state: state,
        }
      );
      console.log(response.data);

      setData(response.data);
      setLoading(false);

      const response1 = await axiosInstance.post(
        `http://127.0.0.1:8000/api/getData/`,
        {
          state: state,
        }
      );
      console.log(response1.data.plot_list);

      setGraph(response1.data);
      setLoading1(false)
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
              <TableHead>Difference</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data &&
              data.Product_name.map((product: any, index: any) => (
                <TableRow key={product}>
                  <TableCell>{product}</TableCell>
                  <TableCell>{data.Stock[index]}</TableCell>
                  <TableCell>
                    {parseInt(data.demand[0][product].toFixed(2))}
                  </TableCell>
                  <TableCell>
                    {parseInt(
                      (data.demand[0][product] - data.Stock[index]).toFixed(2)
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      )}
      <h2 className="text-2xl font-bold mt-8">Graphs</h2>
      <div className="flex justify-center items-center space-x-4">
        {loading1 ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="flex">
            {graph?.plot_list?.map((plot:any, index:any) => (
              <div key={index} className="flex justify-center mt-4">
                <img
                  src={`data:image/png;base64,${plot}`}
                  alt={`Graph ${index + 1}`}
                  className="w-full max-w-2xl rounded-lg shadow-lg"
                />
              </div>
            ))}
           
          </div>
        )}
      </div>
    </div>
  );
}
