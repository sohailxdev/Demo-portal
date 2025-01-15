import { NavData } from "./types";

// const BASE_URL = "/API";
const BASE_URL = "https://ace-t.actifyzone.com/ace-test/API";

const ApplicationName = "Ace Portal";

const bloodGroup = ["A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-"];

export { BASE_URL, ApplicationName, bloodGroup };

export const authority = [
  {
    id: 1,
    authority: "Master Admin",
  },
  {
    id: 2,
    authority: "Admin",
  },
  {
    id: 3,
    authority: "FF Booking",
  },
  {
    id: 4,
    authority: "FF Shipping Instruction",
  },
  {
    id: 5,
    authority: "FF Custom Service",
  },
  {
    id: 6,
    authority: "T Operation",
  },
  {
    id: 7,
    authority: "T Documentation",
  },
  {
    id: 8,
    authority: "T Custom Service",
  },
  {
    id: 9,
    authority: "C Shipping Bill",
  },
  {
    id: 10,
    authority: "C Documentation",
  },
  {
    id: 11,
    authority: "C Custom Service",
  },
];

export function filterNavItems(
  navItems: NavData[],
  matchingIds: string[]
): NavData[] {
  return navItems.reduce<NavData[]>((acc, item) => {
    // Filter the children recursively, if there are any
    let filteredChildren: NavData[] = [];
    if (item.children) {
      filteredChildren = filterNavItems(item.children, matchingIds);
    }

    // Check if the current item or its children should be included
    if (matchingIds.includes(item.id) || filteredChildren.length > 0) {
      acc.push({
        ...item,
        children: filteredChildren, // Always return children as an array, even if empty
      });
    }

    return acc;
  }, []);
}

export function filterNavItemIdsNotMatching(
  navItems: NavData[],
  matchingIds: string[]
): string[] {
  return navItems.reduce<string[]>((acc, item) => {
    // Recursively filter the children, if there are any
    let filteredChildrenIds: string[] = [];
    if (item.children) {
      filteredChildrenIds = filterNavItemIdsNotMatching(
        item.children,
        matchingIds
      );
    }

    // Check if the current item id should be included
    if (!matchingIds.includes(item.id)) {
      acc.push(item.id); // Push the id if it doesn't match
    }

    // Include the children ids that don't match
    return acc.concat(filteredChildrenIds);
  }, []);
}

export function formatDateToYYMMDD(date: any) {
  const year = date.getFullYear().toString();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}/${month}/${day}`;
}

export function formatDateRange(dateRange: any) {
  const fromFormatted = formatDateToYYMMDD(dateRange.from);
  const toFormatted = formatDateToYYMMDD(dateRange.to);

  return { from: fromFormatted, to: toFormatted };
}

export const msalConfig = {
  auth: {
    clientId: "81f77010-558b-4aa4-8a84-55431a1a2c82", // Replace with your client ID
    authority: `https://login.microsoftonline.com/3cda2dd2-87c6-4509-82f8-8977b979cddb`, // Replace with your tenant ID
    redirectUri: "http://localhost:5174", // Ensure this matches your registered redirect URI
  },
};
