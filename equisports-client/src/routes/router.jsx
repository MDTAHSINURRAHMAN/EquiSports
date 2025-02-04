import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import AddEquipments from "../pages/AddEquipments";
import AllEquipments from "../pages/AllEquipments";
import ViewDetails from "../pages/ViewDetails";
import Register from "../pages/Register";
import Login from "../pages/Login";
import PrivateRoute from "./PrivateRouter";
import MyEquipment from "../pages/MyEquipment";
import Update from "../pages/Update";
import Error from "../pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
  },
  {
    path: "/add-equipments",
    element: (
      <PrivateRoute>
        <AddEquipments></AddEquipments>
      </PrivateRoute>
    ),
  },
  {
    path: "/all-equipments",
    element: <AllEquipments></AllEquipments>,
    loader: () =>
      fetch("https://equis-sports-server-project.vercel.app/add-equipments"),
  },
  {
    path: "/view/:id",
    element: (
      <PrivateRoute>
        <ViewDetails></ViewDetails>
      </PrivateRoute>
    ),
  },
  {
    path: "/my-equipments",
    element: <MyEquipment></MyEquipment>,
  },
  {
    path: "/my-equipments/update/:id",
    element: (
      <PrivateRoute>
        <Update></Update>
      </PrivateRoute>
    ),
  },
  {
    path: "/auth/register",
    element: <Register></Register>,
  },
  {
    path: "/auth/login",
    element: <Login></Login>,
  },
  {
    path: "*",
    element: <Error></Error>,
  },
]);

export default router;
