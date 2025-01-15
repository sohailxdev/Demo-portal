import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { NavData } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertToYYMMDD = (date: string): string => {
  if (date) {
    return date.split("/").reverse().join("-");
  } else {
    return "";
  }
};

export const phoneValidation = new RegExp(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/);

export const latitude_longitude_regex = /^(\-?\d+(\.\d+)?),\w*(\-?\d+(\.\d+)?)$/;

export const getLocationFromPin = async (pin: string) => {
  try {
    const res = await fetch("https://api.postalpincode.in/pincode/" + pin);
    const resp = await res.json();
    return resp;
  } catch (error) {
    return error;
  }
};

export const getFlattenedIdFromSideBar = (items: any[]) => {
  return new Set(
    items.flatMap((item) => [
      item.id,
      ...(item.children ? item.children.map((child: any) => child.id) : []),
    ])
  );
};

export function filterNavItemsFromIds(
  navItems: NavData[],
  matchingIds: string[]
) {
  return navItems.reduce<NavData[]>((acc, item) => {
    // Filter the children recursively, if there are any
    let filteredChildren: NavData[] | undefined = undefined;
    if (item.children) {
      filteredChildren = filterNavItemsFromIds(item.children, matchingIds);
    }

    // Check if the current item or its children should be included
    if (
      matchingIds.includes(item.id) ||
      (filteredChildren && filteredChildren.length > 0)
    ) {
      acc.push({
        ...item,
        children: filteredChildren, // Keep children only if they are matched
      });
    }

    return acc;
  }, []);
}
