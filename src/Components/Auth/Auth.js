import { useRouter } from "next/router";

const withAuth = (WrappedComponent) => {
  // eslint-disable-next-line react/display-name
  return (props) => {
    // checks whether we are on client / browser or server.
    if (typeof window !== "undefined") {
        const Router = useRouter();
        const data = localStorage.getItem("admin");
        // const accesstoken = JSON.parse(data);
        // const usertoken = accesstoken.usertoken;

        if(!data) {  
          // If there is no access token we redirect to "/" page.
          Router.push("/admin/login");
          return null;
        }
             
            // If this is an accessToken we just render the component that was passed with all its props
            
            return <WrappedComponent {...props} />;
    }

    // If we are on server, return null
    return null;
  };
};

export default withAuth;
