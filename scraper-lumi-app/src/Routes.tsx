import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles/GlobalStyles";
import CustomThemeProvider from "./styles/ThemeProvider/ThemeProvider";
import { DefaultTheme } from "./styles/Themes/default";
import Home from "./pages/home/Home";
import Invoices from "./pages/invoices/Invoices";


const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
        path: "/:id",
        element: <Home />,
      },
      {
        path: "/:id/invoices",
        element: <Invoices />
      }
  ]);

export default function Routes() {
  return (
    <CustomThemeProvider theme={DefaultTheme} >
      <RouterProvider router={router}/>
      <GlobalStyles />
    </CustomThemeProvider>
  )
}
