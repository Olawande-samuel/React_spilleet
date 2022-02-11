import React from 'react';
import {useNavigate} from "react-router-dom";

const userAuth = (WrappedComponent) => {
    return (props) => {
        
        const Router = useNavigate();
        const data = localStorage.getItem("user");
        // const accesstoken = JSON.parse(data);
        // const usertoken = accesstoken.usertoken;

        if(!data) {  
            // If there is no access token we redirect to "/" page.
            Router("/login");
            return null;
        }
                
            // If this is an accessToken we just render the component that was passed with all its props
            
            return <WrappedComponent {...props} />;
   
    }   
}
export default userAuth