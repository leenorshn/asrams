import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from './firebase';

export const BasketContext = createContext<BasketContextType | null>(null);



type Product = {
    id: string,
    name: string,
    price: number
    quantity: number,
    url: string
    date: number
}

type BasketItem = {
    product: Product
    count: number
}

type BasketContextType = {
    panier: BasketItem[]
    setPanier: React.Dispatch<React.SetStateAction<BasketItem[]>>
    deleteProduct: Function,
    addInPanier: Function,
    totalPanier: Function
    selectedProduct: Product
    setSelectedProduct: React.Dispatch<React.SetStateAction<Product>>
}


export function BasketProvider({ children }) {

    // const [loading, setLoading] = useState(true);
    const [panier, setPanier] = useState<BasketItem[]>([])
    const [selectedProduct, setSelectedProduct] = useState()

    const deleteProduct = (id) => {
        var p = panier.filter(p => p.product.id !== id);
        setPanier(p);
    }

    const totalPanier = () => {
        var t = 0
        for (var i = 0; i < panier.length; i++) {
            t = t + (panier[i].product.price * panier[i].count);
        }

        return t;
    }

    function addInPanier(food: BasketItem) {
        var item = food;
        let found = false;
        if (panier == null || panier.length == 0) {
            //panier.unshift(item);
            // totalItems = totalItems + 1;
            setPanier([item, ...panier])
        } else {
            for (var i = 0; i < panier.length; i++) {
                if (panier[i].product.name == item.product.name) {
                    panier[i].count = panier[i].count + 1;
                    found = true;
                    // totalItems = totalItems + 1;

                }
            }
            if (found == false) {
                setPanier([item, ...panier])
                // totalItems = totalItems + 1;

            }
        }


    }

    const value = {
        panier,
        setPanier,
        deleteProduct,
        addInPanier,
        totalPanier,
        selectedProduct,
        setSelectedProduct
    };

    return <BasketContext.Provider value={value}>{children}</BasketContext.Provider>;
}

export function useBasket() {
    return useContext(BasketContext);
}