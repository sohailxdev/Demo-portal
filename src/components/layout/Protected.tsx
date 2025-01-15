// import { useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { ReactNode } from "react";
// import { BASE_URL } from "@/lib/constants";
// import { useAppDispatch, useAppSelector } from "@/app/hooks";
// import {
//   cleanAuth,
//   selectRoleId,
//   setAuth,
// } from "@/features/authSlice/authSlice";
// import axios from "axios";
// import { getFlattenedIdFromSideBar } from "@/lib/utils";
// import { setsidebar } from "@/features/sidebar/SideBarSlice";
// import Logo from "@/assets/logo.png";
// import { ImSpinner2 } from "react-icons/im";

// interface ProtectedProps {
//   children: ReactNode;
// }

// interface TokenRes {
//   accessToken: string;
//   companyId: string;
//   message: string;
//   role: string;
//   roleId: string;
//   userId: string;
//   sidebar: any[];
// }

// const Protected: React.FC<ProtectedProps> = ({ children }) => {
//   const roleId = useAppSelector(selectRoleId);
//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();
//   const location = useLocation();
//   const checkTokenValidity = async () => {
//     const res = await axios.get<TokenRes>(BASE_URL + "/Login/Role");
//     !roleId &&
//       dispatch(
//         setAuth({
//           role: `${res.data.role}`,
//           roleId: `${res.data.roleId}`,
//           username: "",
//         })
//       );
//     const ids = getFlattenedIdFromSideBar(res.data.sidebar);
//     dispatch(setsidebar([...ids].map((id) => String(id))));
//   };

//   useEffect(() => {
//     if (localStorage.getItem("token")) {
//       checkTokenValidity();
//     } else {
//       localStorage.removeItem("token");
//       dispatch(cleanAuth());
//       navigate("/login");
//     }
//   }, [navigate, location]);
//   return roleId ? (
//     <>{children}</>
//   ) : (
//     <div className="h-screen flex justify-center items-center">
//       <div className="flex flex-col items-center gap-3">
//         <img src={Logo} alt="logo" className="w-16" />
//         <div className="flex items-center gap-1">
//           <ImSpinner2 className="animate-spin text-xl text-red-600" />
//           <p className="text-xl">Loading...</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Protected;
