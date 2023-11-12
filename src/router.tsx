import { createBrowserRouter } from "react-router-dom";
import { Apple, Banana, Root } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/apple",
        element: <Apple />,
      },
      {
        path: "/banana",
        element: <Banana />,
      },
    ],
  },
]);

export default router;
