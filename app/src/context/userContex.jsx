import { createContext } from "react";
const token = localStorage.getItem("jwt");

export const userContext = createContext(token);
