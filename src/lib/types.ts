// Navbar  ----------------------------------------------------------------------

export interface NavData {
  name: string;
  label: string;
  link?: string;
  icon: any;
  children?: NavData[];
  id:string;
}

export interface LogInData {
  message: string;
  roleId: string;
  accessToken: string;
  role: string;
  companyId: string;
  sidebar: string[];
  userId: string;
}

export interface LogInError {
  message: string;
}

export interface ErrorResponse {
  response?: {
    data?: {
      timestamp: string;
      status: string;
      error: string;
      message: string;
      path: string;
    };
  };
}
