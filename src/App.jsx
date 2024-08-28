import "./App.css";
import Layout from "./templates/Layout";
import Home from "./views/Home";
import NoPage from "./views/NoPage";
import Cardapio from "./views/Cardapio";
import Login from "./views/Login";
import { createBrowserRouter } from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NoPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "cardapio",
        element: <Cardapio />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);

export default router;
