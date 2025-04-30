import Dashboard from "../components/pages/Dashboard";
import AddUserModal from "../components/pages/AddUserModal"; // Adjust import as necessary
import UserProfileModal from "../components/pages/UserProfileModal"; // Adjust import as necessary
import PrivateLayout from "../layout/PrivateLayout";

const PrivateRoutes = [
  {
    path: "/dashboard",
    element: (
      <PrivateLayout>
        <Dashboard />
      </PrivateLayout>
    ),
  },
  {
    path: "/add-user",
    element: (
      <PrivateLayout>
        <AddUserModal />
      </PrivateLayout>
    ),
  },
  {
    path: "/my-profile",
    element: (
      <PrivateLayout>
        <UserProfileModal />
      </PrivateLayout>
    ),
  },
  // Additional private routes can go here
];

export default PrivateRoutes;
