import { createContext, useState } from 'react';
import jwt_decode from "jwt-decode";


const token = localStorage.getItem("jwt")
const decode =jwt_decode(token)

export const userContext = createContext(decode);