/**
 * 
 */

import React, { createContext, useContext, useState } from 'react';
import { User } from './Types';

interface UserContextValue {
    loggedUser: User | null;
    setLoggedUser: (loggedUser: User | null) => void;

    // addedProduct: Product | null;
    // setAddedProduct: (addedProduct: Product | null) => void;
}

const UserContext = createContext<UserContextValue>({
    loggedUser: null,
    setLoggedUser: () => { },

    // addedProduct: null,
    // setAddedProduct: () => { },
});

export function useUserContext() {
    return useContext(UserContext);
}

interface UserProviderProps {
    children: React.ReactNode;
}


export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {

    const [loggedUser, setLoggedUser] = useState<User | null>(null);
    // const [addedProduct, setAddedProduct] = useState<Product | null>(null);

    //   const [userLogged, setUserLogged] = useState<any>('');
    //   function updateUser(user: User) {
    //     if (user) {
    //       setUser({ ...user });
    //     } else {
    //       setUser(null);
    //     }
    //   }


    return (
        <UserContext.Provider value={{
            loggedUser, setLoggedUser,
            // addedProduct, setAddedProduct
        }}>
            {children}
        </UserContext.Provider>
    );

};
