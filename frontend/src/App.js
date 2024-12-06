import React, { useState } from "react";
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
import { Route, Routes, useLocation } from "react-router-dom";
import { Navbar } from "./components";
import Path from "./constants/Path";
import Login from "./components/loginModule/login";
import RegistrationForm from "./components/loginModule/register";
import Forgotpass from "./components/loginModule/forgotpass";
import LoadingBar from "react-top-loading-bar";
import ChangeEmailPage from "./components/Settings/UpdateEmailAddress";
import ChangePassword from "./components/Settings/ChangePassword";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [progress, setProgress] = useState(0);
  const location = useLocation();
  const hideNavbarRoutes = [Path.LOGIN, Path.REGISTER, Path.FORGOTPASS];

  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path={Path.LOGIN} element={<Login />} />
        <Route path={Path.REGISTER} element={<RegistrationForm />} />
        <Route path={Path.FORGOTPASS} element={<Forgotpass />} />
      </Routes>

      <LoadingBar
        shadow={true}
        height={3}
        color="#0D6EFD"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      {!hideNavbarRoutes?.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path={Path.HOME} element={<Feed />} />
        <Route
          path={Path.MANAGE_EXPENSES}
          element={<ManageExpense setProgress={setProgress} />}
        />
        <Route path={Path.MESSAGE} element={<Message />} />
        <Route path={Path.CREATE_POST} element={<Post />} />
        <Route
          path={Path.CREATE_LIVE_UPDATES}
          element={<CreateLiveUpdates />}
        />
        <Route path={Path.CREATE_PLAN} element={<Plan />} />
        <Route path={Path.PROFILE_PAGE} element={<Profile />} />
        <Route path={Path.EMAIL_UPDATE} element={<ChangeEmailPage/>}/>
        <Route path={Path.PASSWORD_UPDATE} element={<ChangePassword/>}/>
        <Route path={Path.ALL_PLAN} element={<AllPlan setProgress={setProgress}/>} />
        <Route path={Path.MY_PLAN} element={<MyPlan />} />
        <Route path={Path.CANCEL_PAY} element={<CancelPay />} />
      </Routes>
    </div>
  );
}

export default App;
