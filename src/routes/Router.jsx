import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import TodoPage from "../pages/TodoPage";

const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  {
    path: "/",
    element: <TodoPage />,
  },
]);
export default function Router() {
  return <RouterProvider router={router} />;
}
