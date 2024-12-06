import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Inventory from './pages/Inventory';
import { InventoryProvider } from './context/InventoryContext';
import NavigationBar from './components/NavigationBar';
import ColorPickerTool from './components/ColorPickerTool';

function App() {
    return (
        <InventoryProvider>
            <Router>
                <div>
                    <ColorPickerTool />
                    <NavigationBar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/inventory" element={<Inventory />} />
                    </Routes>
                </div>
            </Router>
        </InventoryProvider>
    );
}

export default App;