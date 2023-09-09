/**
 * 
 */

import React, { createContext, useContext, useState } from 'react';
import { ChosenProduct } from './Types';

interface ProductContextValue {
    addedProduct: ChosenProduct | null;
    setAddedProduct: (addedProduct: ChosenProduct | null) => void;
    // productList: Product[];
    // setProductList: React.Dispatch<React.SetStateAction<Product[]>>;
}

const ProductContext = createContext<ProductContextValue>({
    addedProduct: null,
    setAddedProduct: () => { },
});

export function useProductContext() {
    return useContext(ProductContext);
}

interface ProductProviderProps {
    children: React.ReactNode;
}


export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {

    const [addedProduct, setAddedProduct] = useState<ChosenProduct | null>(null);

    return (
        <ProductContext.Provider value={{ addedProduct, setAddedProduct }}>
            {children}
        </ProductContext.Provider>
    );

};
