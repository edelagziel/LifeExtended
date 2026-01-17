import { createContext, useState } from "react";
import {useLocalStorage} from "../customHooks/useLocalStorage"

 const UserContext = createContext();

function UserProvider({ children }) 
{
  const [isProfileFilled, setIsProfileFilled] = useLocalStorage("isProfileFilled",false);

  return (
    <UserContext.Provider value={{ isProfileFilled, setIsProfileFilled }}>
      {children}
    </UserContext.Provider>
  );
}

export  {UserProvider,UserContext};