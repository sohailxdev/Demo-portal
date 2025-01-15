import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppSelector } from "@/app/hooks";
import { selectCS1 } from "./FinalSlice";

export default function Final() {
  const data = useAppSelector(selectCS1);
  console.log(data);
  return (
    <Card className="min-h-screen mx-auto py-10  p-6">
      <div className="min-h-screen">
        <Card className=" mx-auto">
          <CardHeader className="text-center pb-0">
            <CardTitle className="text-xl italic font-medium">EVER</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="border h-12"></TableHead>
                  <TableHead className="border h-12"></TableHead>
                  <TableHead className="border h-12"></TableHead>
                </TableRow>
                <TableRow>
                  <TableHead className="border h-12"></TableHead>
                  <TableHead className="border text-center italic font-medium">
                    WHITE
                  </TableHead>
                  <TableHead className="border text-center italic font-medium">
                    GRAPHITE
                  </TableHead>
                </TableRow>
                <TableRow>
                  <TableHead className="border text-center italic font-medium">
                    FLYOVER
                  </TableHead>
                  <TableHead className="border"></TableHead>
                  <TableHead className="border"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="border">1M 6AX 1 WAY SWITCH</TableCell>
                  <TableCell className="border text-right bg-green-200">
                    {Number(data?.wr).toFixed(2)}
                  </TableCell>
                  <TableCell className="border text-right bg-green-200">
                  {Number(data.gr).toFixed(2)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border">1M 6AX 2 WAY SWITCH</TableCell>
                  <TableCell className="border text-right">15.49</TableCell>
                  <TableCell className="border text-right">17.29</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border">
                    1M 6AX BELL PUSH SWITCH
                  </TableCell>
                  <TableCell className="border text-right">12.37</TableCell>
                  <TableCell className="border text-right">14.17</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border">1M 20AX 1 WAY SWITCH</TableCell>
                  <TableCell className="border text-right">18.53</TableCell>
                  <TableCell className="border text-right">20.33</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border">1M 20AX 2 WAY SWITCH</TableCell>
                  <TableCell className="border text-right">26.75</TableCell>
                  <TableCell className="border text-right">28.55</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border">
                    1M 20AX 1 WAY SWITCH WITH INDICATOR
                  </TableCell>
                  <TableCell className="border text-right">21.15</TableCell>
                  <TableCell className="border text-right">22.95</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border">
                    2M 6AX BELL PUSH SWITCH WITH INDICATOR
                  </TableCell>
                  <TableCell className="border text-right">29.65</TableCell>
                  <TableCell className="border text-right">31.35</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border">
                    2M 20A 1 WAY SWITCH WITH INDICATOR
                  </TableCell>
                  <TableCell className="border text-right">32.93</TableCell>
                  <TableCell className="border text-right">35.63</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="border">
                    2M 32A, D.P. SWITCH WITH INDICATOR
                  </TableCell>
                  <TableCell className="border text-right">56.39</TableCell>
                  <TableCell className="border text-right">59.09</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Card>
  );
}
