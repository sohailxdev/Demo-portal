import axios from "axios";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Login from "./pages/Login";
import CS2 from "./pages/CS2";
import CS1 from "./pages/CS1";
import Final from "./pages/Final";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      // <Protected>
      <Layout />
      // </Protected>
    ),
    children: [
      {
        path: "/CS2",
        element: <CS2 />,
      },
      {
        path: "/CS1",
        element: <CS1 />,
      },
      {
        path: "/final",
        element: <Final />,
      },
    ],
  },
  {
    path: "/login",
    element: (
      // <Protected>
      <Login />
      // </Protected>
    ),
    children: [],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
