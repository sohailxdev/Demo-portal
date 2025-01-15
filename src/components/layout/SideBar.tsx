import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { NavData } from "@/lib/types";
import {
  Album,
  ArrowBigUpDash,
  BookCheck,
  BookPlus,
  Building,
  CalendarArrowUp,
  ChevronDown,
  ChevronUp,
  CirclePlus,
  FilePenLine,
  FileUp,
  Globe,
  Grip,
  House,
  ListCollapse,
  Mails,
  PackageOpen,
  PanelRight,
  Sailboat,
  ScanLine,
  ScrollText,
  TramFront,
  Truck,
  User,
  UserRoundPlus,
} from "lucide-react";
import { useSelector } from "react-redux";
import { useAppSelector } from "@/app/hooks";

const Sidebar = () => {
  const navigate = useNavigate();
  const path = useLocation();
  const [isOpen, setIsOpen] = useState<any>({});
  const [navItems, setNavItems] = useState<NavData[]>([]);

  const handleNavigate = (value: NavData) => {
    if (value.link) {
      navigate(value.link);
    } else {
      setIsOpen({
        ...isOpen,
        [value.name]: !isOpen[value.name],
      });
    }
  };

  return (
    <div className="hidden bg-background lg:block col-span-2 sticky overflow-auto py-2 pr-2 space-y-2.5">
      {rpaNavItems.map((value, i) => {
        return (
          <div key={i}>
            {/* First level */}
            <div
              onClick={() => {
                handleNavigate(value);
              }}
              className={`flex cursor-pointer items-center justify-between py-2 rounded-r ${
                isOpen[value.name] && ""
              } ${
                value.link !== path.pathname
                  ? "ps-1 text-foreground border-s-4 border-s-background"
                  : "ps-1 text-background bg-red-500 font-semibold border-s-4 border-s-green-500"
              }`}
            >
              <div className="flex items-center gap-1">
                {value.icon}
                <p className="text-sm">{value.label}</p>
              </div>
              {value.children &&
                (isOpen[value.name] ? (
                  <ChevronUp className="w-4" />
                ) : (
                  <ChevronDown className="w-4" />
                ))}
            </div>

            {isOpen[value.name] && (
              <div className={`space-y-3 px-2 ms-1 bg-secondary py-3`}>
                {isOpen[value.name] &&
                  value.children?.map((data, i) => {
                    return (
                      <>
                        {/* Second level */}
                        <div
                          key={i}
                          onClick={() => {
                            handleNavigate(data);
                          }}
                          className={`cursor-pointer ${
                            data.link === path.pathname &&
                            "text-red-600 font-semibold"
                          }`}
                        >
                          <div className="flex items-center gap-1 ps-5">
                            {data.icon}
                            <p className="text-sm">{data.label || ""}</p>
                          </div>
                          {data.children &&
                            (isOpen[data.name] ? (
                              <ChevronUp className="w-4" />
                            ) : (
                              <ChevronDown className="w-4" />
                            ))}
                        </div>

                        {/* Third level */}
                        {isOpen[data.name] && (
                          <div className="bg-gray-200 dark:bg-gray-600 space-y-4">
                            {isOpen[data.name] &&
                              data.children?.map((data2, i) => {
                                return (
                                  <>
                                    <div
                                      key={i}
                                      onClick={() => {
                                        handleNavigate(data2);
                                      }}
                                      className={`flex  transition-all hover:opacity-70 items-center justify-between p-2 rounded cursor-pointer ${
                                        data.link === path.pathname &&
                                        "text-blue-700 dark:text-blue-400 font-semibold"
                                      }`}
                                    >
                                      <div className="flex items-center gap-3 text-[0.83rem]  ">
                                        {data.icon}
                                        {data.label || ""}
                                      </div>
                                    </div>
                                  </>
                                );
                              })}
                          </div>
                        )}
                      </>
                    );
                  })}
              </div>
            )}
          </div>
        );
      })}

      <div
        onClick={() => {
          navigate("/sidebar");
        }}
        className={`flex cursor-pointer items-center justify-between py-1.5 rounded-r ${
          "/sidebar" !== path.pathname
            ? "ps-1 text-foreground border-s-4 border-s-background"
            : "ps-1 text-background bg-red-500 font-semibold border-s-4 border-s-green-500"
        }`}
      >
        <div className="flex items-center gap-1">
          <PanelRight className="w-6" />
          <p className="text-sm">Sidebar</p>
        </div>
      </div>
    </div>
  );
};



export const rpaNavItems: NavData[] = [
  {
    name: "CS2",
    label: "CS2",
    link: "/CS2",
    icon: <House className="w-6" />,
    id: "1",
  },
  {
    name: "CS1",
    label: "CS1",
    link: "/CS1",
    icon: <House className="w-6" />,
    id: "1",
  },
  {
    name: "Final",
    label: "Final",
    link: "/Final",
    icon: <House className="w-6" />,
    id: "1",
  },
  
];

export default Sidebar;
