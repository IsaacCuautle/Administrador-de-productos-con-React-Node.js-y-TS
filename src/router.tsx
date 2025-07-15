import { createBrowserRouter } from "react-router-dom";

import Layout from "./layouts/Layout";
import Products, { loader as productsLoader } from "./views/Products";
import NewProduct, { action as NewProductAction } from "./views/NewProduct";
import EditProduct, {loader as EditLoader} from "./views/EditProduct";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Products />,
        loader: productsLoader
      },
      {
        path: "productos/nuevo",
        element: <NewProduct />,
        action: NewProductAction,
      },
      {
        path: "productos/:id/editar", //ROA Patter - Resource Oriented design
        element: <EditProduct />,
        action: NewProductAction,
        loader: EditLoader
      },
    ],
  },
]);
