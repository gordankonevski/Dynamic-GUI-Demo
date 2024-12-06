import React, { useState, useContext } from 'react';
import { InventoryContext } from '../context/InventoryContext';
import { Rnd } from 'react-rnd';

function Inventory() {
    const { inventory, removeFromInventory } = useContext(InventoryContext);
    const [editedQuantity, setEditedQuantity] = useState({}); // For tracking edited quantities
    const [EditDisabled, setEditMode] = useState(true); // Edit mode state
    const [positions, setPositions] = useState({
        putAwayButton: { x: 200, y: 100, width: 180, height: 40 },
        fakeConfirmButton: { x: 200, y: 160, width: 180, height: 40 },
    });

    const handleQuantityChange = (index, newQuantity) => {
        // Update the quantity in editedQuantity
        if (newQuantity >= 0) {
            setEditedQuantity((prev) => {
                const updatedInventory = [...inventory];
                updatedInventory[index].quantity = newQuantity;
                return { ...prev, [index]: newQuantity };
            });
        }
    };

    const handleEditModeToggle = () => {
        setEditMode((prev) => !prev);
    };

    const handleRealConfirmClick = () => {
        alert("Real Confirm button clicked!");
    };

    return (
        <div style={{ padding: '20px', backgroundColor: '#F7F9F9' }}>
            <h1 style={{ color: '#F39C12' }}>Inventory</h1>

            {/* Edit Mode Toggle */}
            <button
                onClick={handleEditModeToggle}
                style={{
                    padding: '8px 12px',
                    backgroundColor: EditDisabled ? '#2C3E50' : '#16A085',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    marginBottom: '20px',
                }}
            >
                {EditDisabled ? 'Edit Mode' : 'Display Mode'}
            </button>

            {inventory.length > 0 ? (
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={thTdStyle}>Name</th>
                            <th style={thTdStyle}>Price</th>
                            <th style={thTdStyle}>Quantity</th>
                            <th style={thTdStyle}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inventory.map((product, index) => (
                            <tr key={index}>
                                <td style={thTdStyle}>{product.name}</td>
                                <td style={thTdStyle}>${product.price}</td>
                                <td style={thTdStyle}>
                                    <input
                                        type="number"
                                        value={editedQuantity[index] || product.quantity}
                                        onChange={(e) => handleQuantityChange(index, e.target.value)}
                                        style={{ width: '80px', textAlign: 'center', padding: '5px' }}
                                    />
                                </td>
                                <td style={thTdStyle}>
                                    {EditDisabled && (
                                        <><button
                                            onClick={() => removeFromInventory(index)}
                                            style={buttonStyle}
                                        >
                                            Put Away
                                        </button><button
                                            onClick={handleRealConfirmClick}
                                            style={{
                                                backgroundColor: '#16A085',
                                                color: 'white',
                                                padding: '10px 20px',
                                                marginLeft: '10px',
                                                cursor: 'pointer',
                                                fontSize: '14px',
                                                border: 'none',
                                            }}
                                        >
                                                Confirm
                                            </button></>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p style={{ color: '#888' }}>Your inventory is empty. Add products from the Home page!</p>
            )}


            {/* Fake Put Away and Fake Confirm Buttons in Edit Mode */}
            {!EditDisabled && (
                <div style={{ position: 'relative' }}>
                    {/* Fake Put Away Button */}
                    <Rnd
                        size={{
                            width: positions.putAwayButton.width,
                            height: positions.putAwayButton.height,
                        }}
                        position={{
                            x: positions.putAwayButton.x,
                            y: positions.putAwayButton.y,
                        }}
                        onDragStop={(e, d) =>
                            setPositions((prev) => ({
                                ...prev,
                                putAwayButton: { x: d.x, y: d.y },
                            }))
                        }
                        onResizeStop={(e, direction, ref, delta, position) =>
                            setPositions((prev) => ({
                                ...prev,
                                putAwayButton: {
                                    x: position.x,
                                    y: position.y,
                                    width: parseInt(ref.style.width, 10),
                                    height: parseInt(ref.style.height, 10),
                                },
                            }))
                        }
                        disableDragging={EditDisabled}
                        enableResizing={!EditDisabled}
                        style={{
                            border: '1px dashed #aaa',
                            padding: '10px',
                            backgroundColor: '#F39C12',
                            color: 'white',
                            textAlign: 'center',
                            cursor: 'pointer',
                            marginRight: '10px',
                        }}
                    >
                        Put Away
                    </Rnd>

                    {/* Fake Confirm Button */}
                    <Rnd
                        size={{
                            width: positions.fakeConfirmButton.width,
                            height: positions.fakeConfirmButton.height,
                        }}
                        position={{
                            x: positions.fakeConfirmButton.x,
                            y: positions.fakeConfirmButton.y,
                        }}
                        onDragStop={(e, d) =>
                            setPositions((prev) => ({
                                ...prev,
                                fakeConfirmButton: { x: d.x, y: d.y },
                            }))
                        }
                        onResizeStop={(e, direction, ref, delta, position) =>
                            setPositions((prev) => ({
                                ...prev,
                                fakeConfirmButton: {
                                    x: position.x,
                                    y: position.y,
                                    width: parseInt(ref.style.width, 10),
                                    height: parseInt(ref.style.height, 10),
                                },
                            }))
                        }
                        disableDragging={EditDisabled}
                        enableResizing={!EditDisabled}
                        style={{
                            border: '1px dashed #aaa',
                            padding: '10px',
                            backgroundColor: '#16A085',
                            color: 'white',
                            textAlign: 'center',
                            cursor: 'pointer',
                        }}
                    >
                        Confirm
                    </Rnd>
                </div>
            )}
        </div>
    );
}

const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#F7F9F9',
};

const thTdStyle = {
    border: '1px solid #34495E',
    padding: '10px',
    textAlign: 'left',
    color: '#2C3E50',
    backgroundColor: '#F7F9F9',
};

const buttonStyle = {
    backgroundColor: '#16A085',
    color: 'white',
    padding: '10px 20px',
    marginLeft: '10px',
    cursor: 'pointer',
    fontSize: '14px',
    border: 'none',
};

export default Inventory;
