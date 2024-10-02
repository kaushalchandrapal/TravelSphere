import React, { useState } from "react";
import {
  CreateLiveUpdates,
  Post,
  Plan,
  Feed,
  ManageExpense,
  //   Message,
  Profile,
  MyPlan,
  AllPlan,
} from "./pages/index";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components";
import Path from "./constants/Path";
import Login from "./components/loginModule/login";
import RegistrationForm from "./components/loginModule/register";
import Forgotpass from "./components/loginModule/forgotpass";

function App() {
  return (
    <div>
      <Routes>
        <Route path={Path.LOGIN} element={<Login />} />
        <Route path={Path.REGISTER} element={<RegistrationForm />} />
        <Route path={Path.FORGOTPASS} element={<Forgotpass />} />
      </Routes>

      {/* <Navbar /> */}

      <Routes>
        <Route path={Path.HOME} element={<Feed />} />
        <Route path={Path.MANAGE_EXPENSES} element={<ManageExpense />} />
        {/* <Route path={Path.MESSAGE} element={<Message />} /> */}
        <Route path={Path.CREATE_POST} element={<Post />} />
        <Route
          path={Path.CREATE_LIVE_UPDATES}
          element={<CreateLiveUpdates />}
        />
        <Route path={Path.CREATE_PLAN} element={<Plan />} />
        <Route path={Path.PROFILE_PAGE} element={<Profile />} />
        <Route path={Path.ALL_PLAN} element={<AllPlan />} />
        <Route path={Path.MY_PLAN} element={<MyPlan />} />
      </Routes>
    </div>
  );
}

export default App;
