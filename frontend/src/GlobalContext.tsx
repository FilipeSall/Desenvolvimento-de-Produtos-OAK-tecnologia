import { createContext, Dispatch, ReactNode, useState } from "react";

interface GlobalContextProps {
    isFormOn: boolean
    setIsFormOn: Dispatch<boolean>
}

const GlobalContext = createContext<GlobalContextProps | null>(null);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {

    const [isFormOn, setIsFormOn] = useState<boolean>(false);
    
    const value = { isFormOn, setIsFormOn };

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    )

}