import { useEffect, useState } from "react";
import Keycloak from "keycloak-js";
const useAuth = () => {
const[isLogin, setIsLogin] = useState(false);
useEffect(() => {
const client = new Keycloak({
    url:import.meta.env.VITE_KEYCLOAK_URL,
    realm:import.meta.env.VITE_KEYCLOAK_REALM,
    clientId:import.meta.env.VITE_KEYCLOAK_CLIENT_ID,

});

client.init({onLoad: 'login-required'}).then((auth) => { setIsLogin(auth)});

}, []);

return isLogin;

}

export { useAuth };