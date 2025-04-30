import SignIn from "../components/pages/SignIn";
import SignUp from "../components/pages/SignUp";
import PublicLayout from "../layout/PublicLayout";

const PublicRoutes = [
  {
    path: "/",
    element: (
      <PublicLayout>
        <SignIn />
      </PublicLayout>
    ),
  },
  {
    path: "/signup",
    element: (
      <PublicLayout>
        <SignUp />
      </PublicLayout>
    ),
  },
];

export default PublicRoutes;
