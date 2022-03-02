import { Navigate } from "react-router-dom";

function getAuth(){
    const data = localStorage.getItem("user")
    if(data){
        const user = JSON.parse(data)
        console.log(user)
        return user.usertoken
    } 
    return null
}

function getAdminAuth(){
    const data = localStorage.getItem("admin")
    if(data){
        const user = JSON.parse(data)
        console.log(user)
        return user.admintoken
    } 
    return null
}

export default function RequireAuth({ children, redirectTo }) {
    let isAuthenticated = getAuth();
    return isAuthenticated ? children : <Navigate to={redirectTo} />;
}

export function AdminRequireAuth({children, redirectTo}) {
    let isAuthenticated = getAdminAuth();
    return isAuthenticated ? children : <Navigate to={redirectTo} />
}