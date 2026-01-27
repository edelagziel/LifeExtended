import { createContext, type ReactNode, type Dispatch, type SetStateAction } from "react";
import { useLocalStorage } from "../customHooks/useLocalStorage";

type UserContextValue = {
  isProfileFilled: boolean;
  setIsProfileFilled: Dispatch<SetStateAction<boolean>>;
};

const UserContext = createContext<UserContextValue | undefined>(undefined);

type UserProviderProps = {
  children: ReactNode;
};

function UserProvider({ children }: UserProviderProps) {
  const [isProfileFilled, setIsProfileFilled] = useLocalStorage(
    "isProfileFilled",
    false
  );

  const value: UserContextValue = { isProfileFilled, setIsProfileFilled };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export { UserProvider, UserContext };