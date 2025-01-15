import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  value: number;
  role: string | null;
  roleId: string | null;
  companyId: string | null | number;
  emp_id: string | null;
  userDetails: Employee[];
  isSwitching: boolean;
}

interface Employee {
  id: string;
  firstname: string;
  middlename: string;
  lastname: string;
  email: string;
  gender: string;
  age: string;
  joiningdate: string;
  bloodgroup: string;
  birthyear: string;
  joiningdateYear: string;
  maritalStatus: string;
  disability: string;
  disabilityType: string;
  group_id: string;
  company_id: string;
  profile_id: string;
  profile_name: string;
  department_id: string;
  department: string;
  reporting_manager_id: string;
  reporting_manager: string;
  reporting_manager_dept_id: string;
  prefix: string;
  sufix: string;
  designation_id: string;
  designation: string;
  status: boolean;
  email_status: boolean;
  laptop_details: string;
  laptop_manufacturers: string;
  laptop_model_no: string;
  laptop_serial_no: string;
  currentdate: string;
  currenttime: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
  total_employee: string;
  remaining_employee: string;
  employee_status: string;
  company_name: string;
  dateofBirth: string;
  mobileNumber: string;
  alternateMobileNumber: string;
  telephoneNumber: string;
  alternateTelephoneNumber: string;
}

const initialState: AuthState = {
  value: 0,
  role: null,
  roleId: null,
  emp_id: null,
  companyId: null,
  userDetails: [],
  isSwitching: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    setAuthData: (
      state,
      action: PayloadAction<{
        authority: string;
        authority_id: string;
        company_id: string;
        emp_id: string;
        userDetails: Employee;
      }>
    ) => {
      state.role = action.payload.authority;
      state.roleId = action.payload.authority_id;
      state.companyId = action.payload.company_id;
      state.emp_id = action.payload.emp_id;
    },
    setRole: (state, action: PayloadAction<string>) => {
      state.role = action.payload;
    },
    setRoleId: (state, action: PayloadAction<string>) => {
      state.roleId = action.payload;
    },
    setCompanyId: (state, action: PayloadAction<string>) => {
      state.companyId = action.payload;
    },
    setEmpId: (state, action: PayloadAction<string>) => {
      state.emp_id = action.payload;
    },
    setUserDetails: (state, action: PayloadAction<Array<Employee>>) => {
      state.userDetails = action.payload;
    },
    setIsSwitching: (state, action: PayloadAction<boolean>) => {
      state.isSwitching = action.payload;
    },
    cleanUp: (state) => {
      state.value = 0;
      state.role = null;
      state.roleId = null;
      state.emp_id = null;
      state.companyId = null;
      state.userDetails = [];
    },
  },
});

export const {
  setRole,
  setRoleId,
  setCompanyId,
  setUserDetails,
  setEmpId,
  cleanUp,
  setAuthData,
  setIsSwitching,
} = authSlice.actions;

export default authSlice.reducer;
