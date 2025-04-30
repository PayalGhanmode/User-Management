import { createBrowserRouter } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";

const Routes = createBrowserRouter([...PrivateRoutes, ...PublicRoutes]);

export default Routes;
