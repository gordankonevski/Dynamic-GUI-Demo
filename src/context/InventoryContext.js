import React, { createContext, useState } from 'react';

// Create the context
export const InventoryContext = createContext();

// Create the provider component
export const InventoryProvider = ({ children }) => {
    const [inventory, setInventory] = useState([]);

    // Add product to the inventory
    const addToInventory = (product) => {
        setInventory((prevInventory) => [...prevInventory, product]);
    };

    // Remove product from the inventory by index
    const removeFromInventory = (index) => {
        setInventory((prevInventory) => prevInventory.filter((_, i) => i !== index));
    };

    return (
        <InventoryContext.Provider value={{ inventory, addToInventory, removeFromInventory }}>
            {children}
        </InventoryContext.Provider>
    );
};

export default InventoryContext;