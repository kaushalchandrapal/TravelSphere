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

function App() {
  return (
    <div>
      <Navbar />

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
