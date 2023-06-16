import { useEffect, useState, useRef } from "react";
import Keycloak from "keycloak-js";

const client = new Keycloak({
  url: import.meta.env.VITE_KEYCLOAK_URL,
  realm: import.meta.env.VITE_KEYCLOAK_REALM,
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
});

const useAuth = () => {
  const [isLogin, setIsLogin] = useState(false);
  const isRun = useRef(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (isRun.current) return;

    isRun.current = true;

    client.init({ onLoad: "login-required" }).then(async (auth) => {
      setIsLogin(auth);
      console.log("auth", auth);
      setToken(client.token);
    });
  }, []);

  return [isLogin, token];
};

export { useAuth };
