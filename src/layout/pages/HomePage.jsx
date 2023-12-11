import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Home, { loader as homeLoader } from "../ui/Home";
import ErrorPage from "./ErrorPage";
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        element={<Home />}
        loader={homeLoader}
        errorElement={<ErrorPage />}
      />
      <Route path="*" element={<ErrorPage />} />
    </>,
  ),
);
export default function HomePage() {
  return <RouterProvider router={router} />;
}
