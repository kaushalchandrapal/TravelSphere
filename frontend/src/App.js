import React, { useState, useEffect } from "react";
import {
  CreateLiveUpdates,
  Post,
  Plan,
  Feed,
  ManageExpense,
  Message,
  Profile,
  MyPlan,
  AllPlan,
  CancelPay,
} from "./pages/index";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { Navbar } from "./components";
import Path from "./constants/Path";
import AccessibilityPanel from "./components/AccessibilityPanel/AccessibilityPanel";
import Login from "./components/loginModule/login";
import RegistrationForm from "./components/loginModule/register";
import Forgotpass from "./components/loginModule/forgotpass";
import LoadingBar from "react-top-loading-bar";
import ChangeEmailPage from "./components/Settings/UpdateEmailAddress";
import ChangePassword from "./components/Settings/ChangePassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminLayout from "./layouts/Admin/AdminLayout";
import Users from "./components/Admin/Users";
import Posts from "./components/Admin/Posts";
import Plans from "./components/Admin/Plans";
import LiveUpdates from "./components/Admin/LiveUpdates";

// Helper function to check authentication
const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

// Private Route Component
const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to={Path.LOGIN} />;
};

function App() {
  const [progress, setProgress] = useState(0);
  const location = useLocation();
  const hideNavbarRoutes = [Path.LOGIN, Path.REGISTER, Path.FORGOTPASS];
  const { pathname } = location;

  // Identify if the current route belongs to the admin panel
  const isAdminRoute = pathname.includes("/admin");

  console.log(pathname);
  

  return (
    <div>
      <ToastContainer />

        {!hideNavbarRoutes?.includes(location.pathname) && <Navbar />}
      <Routes>
        {/* Public Routes */}
        <Route path={Path.LOGIN} element={<Login />} />
        <Route path={Path.REGISTER} element={<RegistrationForm />} />
        <Route path={Path.FORGOTPASS} element={<Forgotpass />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="posts" element={<Posts />} />
          <Route path="plans" element={<Plans />} />
          <Route path="liveupdates" element={<LiveUpdates />} />
        </Route>
        {/* Private Routes */}
        <Route
          path={Path.HOME}
          element={
            <PrivateRoute>
              <Feed />
            </PrivateRoute>
          }
        />
        <Route
          path={Path.MANAGE_EXPENSES}
          element={
            <PrivateRoute>
              <ManageExpense setProgress={setProgress} />
            </PrivateRoute>
          }
        />
        <Route
          path={Path.MESSAGE}
          element={
            <PrivateRoute>
              <Message />
            </PrivateRoute>
          }
        />
        <Route
          path={Path.CREATE_POST}
          element={
            <PrivateRoute>
              <Post />
            </PrivateRoute>
          }
        />
        <Route
          path={Path.CREATE_LIVE_UPDATES}
          element={
            <PrivateRoute>
              <CreateLiveUpdates />
            </PrivateRoute>
          }
        />
        <Route
          path={Path.CREATE_PLAN}
          element={
            <PrivateRoute>
              <Plan />
            </PrivateRoute>
          }
        />
        <Route
          path={Path.PROFILE_PAGE}
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path={Path.EMAIL_UPDATE}
          element={
            <PrivateRoute>
              <ChangeEmailPage />
            </PrivateRoute>
          }
        />
        <Route
          path={Path.PASSWORD_UPDATE}
          element={
            <PrivateRoute>
              <ChangePassword />
            </PrivateRoute>
          }
        />
        <Route
          path={Path.ALL_PLAN}
          element={
            <PrivateRoute>
              <AllPlan setProgress={setProgress} />
            </PrivateRoute>
          }
        />
        <Route
          path={Path.MY_PLAN}
          element={
            <PrivateRoute>
              <MyPlan />
            </PrivateRoute>
          }
        />
        <Route
          path={Path.CANCEL_PAY}
          element={
            <PrivateRoute>
              <CancelPay />
            </PrivateRoute>
          }
        />
      </Routes>

      <LoadingBar
        shadow={true}
        height={3}
        color="#0D6EFD"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
     
      <AccessibilityPanel />
    </div>
  );
}

export default App;
