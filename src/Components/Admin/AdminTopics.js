import Admin from "./Admin";
import Topics from "./Manage/Topics";
import React from "react";
import ErrorBoundary from "../Error/ErrorBoundary"
const AdminTopics = () => {
  return (
    <Admin>
      <ErrorBoundary>
      <Topics />
      </ErrorBoundary>
    </Admin>
  );
};

export default AdminTopics;
