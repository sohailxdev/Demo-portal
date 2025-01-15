import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";
import { ScrollArea } from "../ui/scroll-area";
import { ChevronDown, ChevronUp, Menu, PanelRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { allNavItems } from "./SideBar";
import { ApplicationName } from "@/lib/constants";
import { Button } from "../ui/button";
import { NavData } from "@/lib/types";
import { filterNavItemsFromIds } from "@/lib/utils";
import { useSelector } from "react-redux";
import { useAppSelector } from "@/app/hooks";

export function MobileSidebar() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [navItems, setNavItems] = useState<NavData[]>([]);
  const path = useLocation();

  const [isOpen, setIsOpen] = useState<any>({
    account: false,
    contact: false,
    lead: false,
    deal: false,
  });

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Menu className="block lg:hidden text-3xl cursor-pointer" />
      </SheetTrigger>
      <SheetContent side="left" className="px-0">
        <ScrollArea className="h-full flex flex-col ">
          <div className="flex gap-2 justify-center items-center py-3">
            <img src={logo} alt="logo" className="w-5" />
            <p className="font-medium text-lg">{ApplicationName}</p>
          </div>
          <ul className="space-y-3 px-2">
            {navItems.map((value, i) => {
              return (
                <div key={i}>
                  {/* First level */}
                  <div
                    onClick={() => {
                      if (value.link) {
                        navigate(value.link);
                        setOpen(false);
                      } else {
                        setIsOpen({
                          ...isOpen,
                          [value.name]: !isOpen[value.name],
                        });
                      }
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
                                  if (data.link) {
                                    navigate(data.link);
                                    setOpen(false);
                                  } else {
                                    setIsOpen({
                                      ...isOpen,
                                      [data.name]: !isOpen[data.name],
                                    });
                                  }
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
                                              if (data2.link) {
                                                setOpen(false);
                                                navigate(data2.link);
                                                setOpen(false);
                                              } else {
                                                setIsOpen({
                                                  ...isOpen,
                                                  [data2.name]:
                                                    !isOpen[data2.name],
                                                });
                                              }
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

            <Button
              onClick={() => {
                toast({
                  title: "Logout Successfully",
                });
                navigate("/login");
                setOpen(false);
                localStorage.removeItem("token");
                localStorage.removeItem("role");
                sessionStorage.clear();
              }}
              variant="destructive"
              size="sm"
              className="w-full"
            >
              Sign out
            </Button>
          </ul>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
