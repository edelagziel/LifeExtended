import { createContext, useState } from "react";

 const UserContext = createContext();

function UserProvider({ children }) 
{
  const [isProfileFilled, setIsProfileFilled] = useState(false);

  return (
    <UserContext.Provider value={{ isProfileFilled, setIsProfileFilled }}>
      {children}
    </UserContext.Provider>
  );
}

export  {UserProvider,UserContext};