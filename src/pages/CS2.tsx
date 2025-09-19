import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/app/hooks";
import { selectMain } from "./MainSlice";
import { addCS1S } from "./cs1Slice";

// Form schema validation
const formSchema = z.object({
  valoy: z.string(),
  shiftHrs: z.string(),
  pcPwd: z.string(),
  shiftRate: z.string(),
});

export default function CS2() {
  const dispatch = useDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      valoy: "360.00",
      shiftHrs: "8.00",
      pcPwd: "230",
      shiftRate: "4000.00",
    },
  });

  const data = useAppSelector(selectMain);

  const [productData, setProductData] = useState(data);

  // Function to calculate and update the product data
  const updateProductData = () => {
    const { pcPwd, shiftRate } = form.watch();
    const pcPwdValue = parseFloat(pcPwd) || 0;
    const shiftRateValue = parseFloat(shiftRate) || 0;

    const updatedData = productData.map((product) => {
      const wt = parseFloat(product.wt) || 0;
      const cavity = parseFloat(product.cavity) || 0;
      const cycleTime = parseFloat(product.cycleTime) || 0;
      const quantity = parseFloat(product.quantity) || 0;
      const spray = parseFloat(product.spray) || 0;
      const rmCost = (pcPwdValue * wt) / 1000;
      const wst = rmCost * 0.02;
      const qtyShift = (28800 / cycleTime) * cavity;
      const labourCost = shiftRateValue / qtyShift;
      const totalRmCost = rmCost + wst;
      const totalCost = labourCost + totalRmCost;
      const total = quantity * totalCost;
      const spraycost = spray + totalCost;

      return {
        ...product,
        rmCost,
        wst,
        qtyShift,
        labourCost,
        total,
        totalRmCost,
        totalCost,
        spraycost,
      };
    });

    setProductData(updatedData);
    localStorage.setItem("productData", JSON.stringify(updatedData));
    dispatch(addCS1S(updatedData));
  };

  // Update data when form changes
  useEffect(() => {
    updateProductData();
  }, [form.watch()]); 

  return (
    <Card className="min-h-screen mx-auto py-10 bg-white p-6">
      <div className="container mx-auto py-10">
        <form className="space-y-8">
          <div className="grid grid-cols-4 gap-2">
            <div>
              <label>VALOY</label>
              <Input {...form.register("valoy")} />
            </div>
            <div>
              <label>SHIFT/HRS</label>
              <Input {...form.register("shiftHrs")} />
            </div>
            <div>
              <label>PC PWD</label>
              <Input {...form.register("pcPwd")} />
            </div>
            <div>
              <label>SHIFT RATE</label>
              <Input {...form.register("shiftRate")} />
            </div>
          </div>
        </form>

        <div className="mt-8 border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Code</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Wt</TableHead>
                <TableHead>RM Cost</TableHead>
                <TableHead>WST</TableHead>
                <TableHead>Total RM</TableHead>
                <TableHead>cycleTime</TableHead>
                <TableHead>cavity</TableHead>
                <TableHead>Qty/Shift</TableHead>
                <TableHead>Labour Cost</TableHead>
                <TableHead>Total Cost</TableHead>
                <TableHead>Spray</TableHead>
                <TableHead>Spray Cost</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productData?.map((product) => (
                <TableRow key={product.code}>
                  <TableCell>{product.code}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>{Number(product.wt)?.toFixed(2)}</TableCell>
                  <TableCell>{Number(product.rmCost)?.toFixed(2)}</TableCell>
                  <TableCell>{Number(product.wst)?.toFixed(2)}</TableCell>
                  <TableCell>
                    {Number(product.totalRmCost)?.toFixed(2)}
                  </TableCell>
                  <TableCell>{Number(product.cycleTime)?.toFixed(2)}</TableCell>
                  <TableCell>{product.cavity}</TableCell>
                  <TableCell>{Number(product.qtyShift)?.toFixed(2)}</TableCell>
                  <TableCell>
                    {Number(product.labourCost)?.toFixed(2)}
                  </TableCell>
                  <TableCell>{Number(product.totalCost)?.toFixed(2)}</TableCell>
                  <TableCell>{product.spray}</TableCell>
                  <TableCell>{Number(product.spraycost)?.toFixed(2)}</TableCell>
                  <TableCell>{Number(product.quantity)?.toFixed(2)}</TableCell>
                  <TableCell>{Number(product.total)?.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Card>
  );
}
