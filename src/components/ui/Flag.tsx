import { RxCross1 } from "react-icons/rx";
import { SiTicktick } from "react-icons/si";

const Flag = ({ value }: { value: string }) => {
  return value == "0" ? (
    <div className="w-full">
      <RxCross1 className="text-red-600 text-xl mx-auto" />
    </div>
  ) : (
    <div className="w-full">
      <SiTicktick className="text-green-600 text-xl mx-auto" />
    </div>
  );
};
export default Flag;
