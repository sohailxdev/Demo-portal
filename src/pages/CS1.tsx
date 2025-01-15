import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useAppSelector } from "@/app/hooks";
import { selectCS1S } from "./CS1Slice";
import { useDispatch } from "react-redux";
import { setCS1Data } from "./FinalSlice";

export default function CS1() {
  const data = useAppSelector(selectCS1S);

  const [rows, setRows] = useState([
    { item: "SW BASE", ow: 219.81 },
    { item: " SW KNOB", ow: 111.06 },
    { item: "SPARKSHIELD", ow: 51.17 },
    { item: "JM 6AM RTC", ow: 323.03 },
    { item: "JM 6AM VTC", ow: 268.81 },
    { item: "JM ZULLA 6A OW", ow: 174.24 },
    { item: "SW ROLLAR (FL)", ow: 14.4 },
    { item: "SPRING VI79 ", ow: 25.92 },
    { item: "PP BAG", ow: 37.44 },
    { item: "OUTER FLATO 6AX OW", ow: 70.06 },
    { item: "C/S & FWDING", ow: 24.0 },
    { item: "LABOUR", ow: 201.6 },
    { item: "CHEAKING & OTHERS", ow: 28.8 },
  ]);

  const sum = rows.reduce((acc, row) => acc + row.ow, 0) + data[0]?.total;

  const dispatch = useDispatch();

  useEffect(() => {
    const wr = ((sum + sum * 0.02) * 0.01 + sum + sum * 0.02) / 144.0;
    const gr = ((sum + sum * 0.02) * 0.01 + sum + sum * 0.02) / 144.0 + 1.8;
    dispatch(setCS1Data({ gr, wr }));
  }, []);

  return (
    <Card className="min-h-screen mx-auto py-10 p-6">
      <div className="min-h-screen">
        <Card className="mx-auto shadow-lg">
          <CardHeader className="bg-gradient-to-r from-slate-800 to-slate-700">
            <CardTitle className="text-white font-medium tracking-tight">
              FG COSTED
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-100 hover:bg-gray-100 text-black">
                    <TableHead className="border px-4 py-2 font-bold text-black">
                      ITEMS
                    </TableHead>
                    <TableHead className="border px-4 py-2 font-medium text-black w-[120px] text-right">
                      OW
                    </TableHead>
                    <TableHead className="border px-4 py-2 font-medium  text-black w-[120px] text-right">
                      Total
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="hover:bg-gray-50/50">
                    <TableCell className="border px-4 py-2">SW COVER</TableCell>
                    <TableCell className="border px-4 py-2 text-right">
                      {data[0]?.total && (data[0]?.total).toFixed(2)}
                    </TableCell>
                    <TableCell className="border px-4 py-2 text-sm text-gray-600">
                      -
                    </TableCell>
                  </TableRow>

                  {rows.map((row, index) => (
                    <TableRow key={index} className="hover:bg-gray-50/50">
                      <TableCell className="border px-4 py-2">
                        {row.item}
                      </TableCell>
                      <TableCell className="border px-4 py-2 text-right">
                        {row.ow}
                      </TableCell>
                      <TableCell className="border px-4 py-2 text-sm text-gray-600"></TableCell>
                    </TableRow>
                  ))}

                  <TableRow className="hover:bg-gray-50/50">
                    <TableCell className="border px-4 py-2"></TableCell>
                    <TableCell className="border px-4 py-2 text-right"></TableCell>
                    <TableCell className="border px-4 py-2 text-sm text-gray-600">
                      -
                    </TableCell>
                  </TableRow>
                  <TableRow className="hover:bg-gray-50/50">
                    <TableCell className="border px-4 py-2"></TableCell>
                    <TableCell className="border px-4 py-2 text-right"></TableCell>
                    <TableCell className="border px-4 py-2 text-sm text-gray-600">
                      -
                    </TableCell>
                  </TableRow>

                  <TableRow className="hover:bg-gray-50/50">
                    <TableCell className="border px-4 py-2">TOTAL</TableCell>
                    <TableCell className="border px-4 py-2 text-right">
                      {sum}
                    </TableCell>
                    <TableCell className="border px-4 py-2 text-sm text-gray-600">
                      -
                    </TableCell>
                  </TableRow>

                  <TableRow className="hover:bg-gray-50/50">
                    <TableCell className="border px-4 py-2"> REJ 2%</TableCell>
                    <TableCell className="border px-4 py-2 text-right">
                      {Number(sum * 0.02).toFixed(2)}
                    </TableCell>
                    <TableCell className="border px-4 py-2 text-sm text-gray-600"></TableCell>
                  </TableRow>

                  <TableRow className="hover:bg-gray-50/50">
                    <TableCell className="border px-4 py-2">
                      Total REJ 2%
                    </TableCell>
                    <TableCell className="border px-4 py-2 text-right">
                      {Number(sum + sum * 0.02).toFixed(2)}
                    </TableCell>
                    <TableCell className="border px-4 py-2 text-sm text-gray-600"></TableCell>
                  </TableRow>

                  <TableRow className="hover:bg-gray-50/50">
                    <TableCell className="border px-4 py-2">FF 1%</TableCell>
                    <TableCell className="border px-4 py-2 text-right">
                      {Number((sum + sum * 0.02) * 0.01).toFixed(2)}
                    </TableCell>
                    <TableCell className="border px-4 py-2 text-sm text-gray-600"></TableCell>
                  </TableRow>

                  <TableRow className="hover:bg-gray-50/50">
                    <TableCell className="border px-4 py-2">
                      Total FF 1%
                    </TableCell>
                    <TableCell className="border px-4 py-2 text-right">
                      {Number(
                        (sum + sum * 0.02) * 0.01 + sum + sum * 0.02
                      ).toFixed(2)}
                    </TableCell>
                    <TableCell className="border px-4 py-2 text-sm text-gray-600"></TableCell>
                  </TableRow>

                  <TableRow className="hover:bg-gray-50/50">
                    <TableCell className="border px-4 py-2">
                      WHITE RATE
                    </TableCell>
                    <TableCell className="border px-4 py-2 text-right">
                      {Number(
                        ((sum + sum * 0.02) * 0.01 + sum + sum * 0.02) / 144
                      ).toFixed(2)}
                    </TableCell>
                    <TableCell className="border px-4 py-2 text-sm text-gray-600"></TableCell>
                  </TableRow>

                  <TableRow className="hover:bg-gray-50/50">
                    <TableCell className="border px-4 py-2">GR RATE</TableCell>
                    <TableCell className="border px-4 py-2 text-right">
                      {Number(
                        ((sum + sum * 0.02) * 0.01 + sum + sum * 0.02) / 144 +
                          1.8
                      ).toFixed(2)}
                    </TableCell>
                    <TableCell className="border px-4 py-2 text-sm text-gray-600"></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Card>
  );
}
