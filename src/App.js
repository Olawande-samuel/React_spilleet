import "./styles/globals.css";
import React, { useState } from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import Test from "./Components/Test";
import Index from "./Components/Index/Index";
import { SearchContext, UserContext } from "./Components/Auth/User";
import { Context, Items, List } from "./Trials/Controller";
import InterestContext from "./Trials/Controller";
import Details from "./Components/Post/PostDetails/Details";
import Outlets from "./Components/Post/Outlets";
import Authenticate from "./Components/Auth/Authenticate";
import User from "./Components/Profile/User";
import ProfileOut from "./Components/Profile/ProfileOut";
import ProfileDeets from "./Components/Profile/UserDetail";
import SettingsOut from "./Components/Settings/SettingsOut";
import { Account } from "./Components/Settings/Account/Account";
import Email from "./Components/Settings/Email/Email";
import Privacy from "./Components/Settings/Privacy/Privacy";
import Createpost from "./Components/Editor/Createpost";
import AdminOutlet from "./Components/Admin/AdminOutlet";
import AdminIndex from "./Components/Admin/Index/Index";
import AdminPosts from "./Components/Admin/AdminPosts";
import AdminTopics from "./Components/Admin/AdminTopics";
import Signup from "./Components/Signup/Signup";
import LoginEntry from "./Components/Login/LoginEntry";
import AdminEntry from "./Components/Login/AdminEntry";
import SignupEntry from "./Components/Signup/SignupEntry";
import RequireAuth, { AdminRequireAuth } from "./Components/Auth/Protected";
function App() {
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  return (
    <SearchContext.Provider value={[search, setSearch]}>
      <UserContext.Provider value={[user, setUser]}>
        <InterestContext.Provider value={List}>
          <Context.Provider value={Items}>
            <Routes>
              <Route path="/" element={<Index />} />
              {/* outlet: for referencing where child routes should appear */}
              <Route path="posts" element={<Outlets />}>
                <Route index element={<Index />} />
                <Route path=":id" element={<Details />} />
              </Route>
              <Route path="user" element={<User />}>
                <Route path="profile" element={<ProfileOut />}>
                  <Route path=":name" element={<ProfileDeets />} />
                </Route>
                <Route
                  path="settings"
                  element={
                    <RequireAuth redirectTo="/login">
                      <SettingsOut />
                    </RequireAuth>
                  }
                >
                  <Route index element={<Account />} />
                  <Route path="email_notification" element={<Email />} />
                  <Route path="privacy" element={<Privacy />} />
                </Route>
                <Route path="create-post" element={<Createpost />} />
              </Route>
              <Route
                path="admin"
                element={
                  <AdminRequireAuth redirectTo="/admin/login">
                    <AdminOutlet />
                  </AdminRequireAuth>
                }
              >
                <Route index element={<AdminIndex />} />
                <Route path="posts" element={<AdminPosts />} />
                <Route path="topics" element={<AdminTopics />} />
              </Route>
              <Route path="login" element={<LoginEntry />} />
              <Route path="admin/login" element={<AdminEntry />} />
              <Route path="signup" element={<SignupEntry />} />

              <Route path="auth/:token" element={<Authenticate />} />
              <Route path="*" element={<p>Not found</p>}></Route>
            </Routes>
          </Context.Provider>
        </InterestContext.Provider>
      </UserContext.Provider>
    </SearchContext.Provider>
  );
}

export default App;
