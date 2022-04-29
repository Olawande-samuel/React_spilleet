import "./styles/globals.css";
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Index from "./Components/Index/Index";
import {
  SearchContext,
  UserContext,
  SidebarContext,
} from "./Components/Auth/User";
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
import ChangeAdminPassword from "./Components/Admin/Manage/ChangeAdminPassword";
import AdminTopics from "./Components/Admin/AdminTopics";
import LoginEntry from "./Components/Login/LoginEntry";
import AdminEntry from "./Components/Login/AdminEntry";
import SignupEntry from "./Components/Signup/SignupEntry";
import RequireAuth, { AdminRequireAuth } from "./Components/Auth/Protected";
import Notifications from "./Components/Profile/Notification/Notifications";
import NotFound from "./Components/Error/404";
import Contact from "./Components/Contact/Contact";
import { Interests } from "./Components/Interest/Interests";
import Forgot from "./Components/Forgot/Forgot";
import ChangePassword from "./Components/Profile/ChangePassword";
import { notificationSubscription } from "./SWnotification";
import Layout from "./Components/Layout/Layout";
function App() {
  React.useEffect(() => {
    localStorage.removeItem("subObj");
    localStorage.removeItem("user");

    const subObj = localStorage.getItem("spilleet_subObj");
    const user = localStorage.getItem("Spilleet_user");
    // confirm that subscription object is null and user is logged in

    if (subObj === null && user !== null) {
      getNotificationStatus();
    }
    // if both user and subscription object exist
    if (user !== null && subObj !== null) {
      if (localStorage.getItem("spilleet_anchor") === null) {
        getNotificationStatus();
      }
    }
  });

  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);
  const [badge, setBadge] = useState("");

  async function getNotificationStatus() {
    if (!("Notification" in window)) {
      window.alert("browser does not support notifications");
    } else if (Notification.permission === "granted") {
      console.log("browser allows notification");
      notificationSubscription();
    } else if (Notification.permission === "default") {
      console.log("browser needs to allows notification");
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        notificationSubscription();
      }
    }
  }

  return (
    <SearchContext.Provider value={[search, setSearch]}>
      <UserContext.Provider value={[user, setUser]}>
        <InterestContext.Provider value={List}>
          <SidebarContext.Provider value={[showSidebar, setShowSidebar]}>
            <Context.Provider value={Items}>
              {/* <Layout> */}
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Index />} />
                  <Route path="posts" element={<Outlets />}>
                    <Route index element={<Index />} />
                    <Route path=":id" element={<Details />} />
                  </Route>
                  <Route path="user" element={<User />}>
                    <Route path="profile" element={<ProfileOut />}>
                      <Route path=":name" element={<ProfileDeets />} />
                    </Route>
                    <Route
                      path="notifications"
                      element={
                        <RequireAuth redirectTo="/login">
                          {" "}
                          <Notifications />{" "}
                        </RequireAuth>
                      }
                    />

                    <Route
                      path="settings"
                      element={
                        <RequireAuth redirectTo="/login">
                          {" "}
                          <SettingsOut />{" "}
                        </RequireAuth>
                      }
                    >
                      <Route index element={<Account />} />
                      <Route path="email_notification" element={<Email />} />
                      <Route path="privacy" element={<Privacy />} />
                    </Route>
                    <Route
                      path="create-post"
                      element={
                        <RequireAuth redirectTo="/login">
                          {" "}
                          <Createpost />{" "}
                        </RequireAuth>
                      }
                    />
                    <Route
                      path="change-password"
                      element={
                        <RequireAuth redirectTo="/login">
                          {" "}
                          <ChangePassword />{" "}
                        </RequireAuth>
                      }
                    />
                  </Route>
                </Route>

                <Route
                  path="interests"
                  element={
                    <RequireAuth redirectTo="/login">
                      {" "}
                      <Interests />{" "}
                    </RequireAuth>
                  }
                />

                <Route
                  path="admin"
                  element={
                    <AdminRequireAuth redirectTo="/admin/login">
                      {" "}
                      <AdminOutlet />{" "}
                    </AdminRequireAuth>
                  }
                >
                  <Route index element={<AdminIndex />} />
                  <Route path="posts" element={<AdminPosts />} />
                  <Route path="topics" element={<AdminTopics />} />
                  <Route
                    path="change-password"
                    element={<ChangeAdminPassword />}
                  />
                </Route>

                <Route path="forgot-password" element={<Forgot />} />
                <Route path="login" element={<LoginEntry />} />
                <Route path="contact-us" element={<Contact />} />
                <Route path="admin/login" element={<AdminEntry />} />
                <Route path="signup" element={<SignupEntry />} />

                <Route path="auth/:token" element={<Authenticate />} />
                <Route path="*" element={<NotFound />}></Route>
              </Routes>
              {/* </Layout> */}
            </Context.Provider>
          </SidebarContext.Provider>
        </InterestContext.Provider>
      </UserContext.Provider>
    </SearchContext.Provider>
  );
}

export default App;
