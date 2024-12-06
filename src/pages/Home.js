import React, { useState, useContext } from 'react';
import { Rnd } from 'react-rnd';
import { InventoryContext } from '../context/InventoryContext';

function Home() {
    const { addToInventory } = useContext(InventoryContext);

    const [fields, setFields] = useState({
        name: 'Product Name',
        price: 49.99,
        quantity: 1,
        description: 'This is a detailed description of the product.',
    });

    const [EditEnabled, setEditMode] = useState(true);
    const [editingField, setEditingField] = useState(null);

    const [fontStyles, setFontStyles] = useState({
        name: 'Arial',
        price: 'Arial',
        quantity: 'Arial',
        description: 'Arial',
    });

    const defaultPositions = {
        name: { x: 220, y: 20, width: 260, height: 30 },
        price: { x: 220, y: 80, width: 150, height: 30 },
        quantity: { x: 220, y: 140, width: 150, height: 30 },
        description: { x: 220, y: 200, width: 400, height: 70 },
        image: { x: 20, y: 20, width: 180, height: 180 },
        profileImage: { x: window.innerWidth - 120, y: 20, width: 100, height: 100 },
        colorPicker: { x: window.innerWidth - 300, y: 200, width: 200, height: 200 },
        addToInventoryPicking: { x: window.innerWidth - 200, y: 400, width: 180, height: 40 },
        confirm: { x: window.innerWidth - 200, y: 450, width: 180, height: 40 },
    };

    const [positions, setPositions] = useState(defaultPositions);

    const handleFieldClick = (field) => setEditingField(field);

    const handleFontChange = (field, font) => {
        setFontStyles((prev) => ({ ...prev, [field]: font }));
    };

    const handleAddToInventory = () => {
        const newProduct = { ...fields };
        addToInventory(newProduct);
    };

    const editableField = (field, value, onChange) => (
        <Rnd
            size={{ width: positions[field].width, height: positions[field].height }}
            position={{ x: positions[field].x, y: positions[field].y }}
            onDragStop={(e, d) =>
                setPositions((prev) => ({
                    ...prev,
                    [field]: { ...prev[field], x: d.x, y: d.y },
                }))
            }
            onResizeStop={(e, direction, ref, delta, position) =>
                setPositions((prev) => ({
                    ...prev,
                    [field]: {
                        x: position.x,
                        y: position.y,
                        width: parseInt(ref.style.width, 10),
                        height: parseInt(ref.style.height, 10),
                    },
                }))
            }
            disableDragging={EditEnabled}
            enableResizing={!EditEnabled}
            style={{
                border: EditEnabled ? 'none' : '1px dashed #aaa',
                padding: '5px',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: '#f9f9f9',
                    padding: '10px',
                    borderRadius: '4px',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                    height: '100%',
                    fontFamily: fontStyles[field],
                }}
            >
                <label
                    style={{
                        fontSize: '14px',
                        color: '#2C3E50',
                        marginBottom: '4px',
                        fontWeight: 'bold',
                    }}
                >
                    {field.charAt(0).toUpperCase() + field.slice(1)}:
                </label>
                {editingField === field ? (
                    <input
                        type={field === 'quantity' ? 'number' : 'text'}
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        onBlur={() => setEditingField(null)}
                        autoFocus
                        style={{
                            padding: '8px',
                            fontSize: '14px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            width: '100%',
                        }}
                    />
                ) : (
                    <span
                        onClick={() => handleFieldClick(field)}
                        style={{
                            fontSize: '16px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            display: 'block',
                        }}
                    >
                        {field === 'price' ? `$${value}` : value}
                    </span>
                )}

                {/* Font family selector on the side */}
                {!EditEnabled && (
                    <select
                        value={fontStyles[field]}
                        onChange={(e) => handleFontChange(field, e.target.value)}
                        style={{
                            marginTop: '10px',
                            padding: '5px',
                            fontSize: '14px',
                            borderRadius: '4px',
                            position: 'absolute',
                            right: '-120px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                        }}
                    >
                        <option value="Arial">Arial</option>
                        <option value="Verdana">Verdana</option>
                        <option value="Tahoma">Tahoma</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Courier New">Courier New</option>
                        <option value="Times New Roman">Times New Roman</option>
                    </select>
                )}
            </div>
        </Rnd>
    );

    return (
        <div
            style={{
                padding: '20px',
                fontFamily: 'Arial, sans-serif',
                backgroundColor: '#f4f4f4',
                minHeight: '100vh',
                position: 'relative',
            }}
        >
            <h1 style={{ color: '#2C3E50', marginBottom: '20px' }}>Dynamic GUI Prototype</h1>

            {/* Profile Image with Resizability and Movability */}
            <Rnd
                size={{
                    width: positions.profileImage.width,
                    height: positions.profileImage.height,
                }}
                position={{
                    x: positions.profileImage.x,
                    y: positions.profileImage.y,
                }}
                onDragStop={(e, d) =>
                    setPositions((prev) => ({
                        ...prev,
                        profileImage: { ...prev.profileImage, x: d.x, y: d.y },
                    }))
                }
                onResizeStop={(e, direction, ref, delta, position) =>
                    setPositions((prev) => ({
                        ...prev,
                        profileImage: {
                            x: position.x,
                            y: position.y,
                            width: parseInt(ref.style.width, 10),
                            height: parseInt(ref.style.height, 10),
                        },
                    }))
                }
                disableDragging={EditEnabled}
                enableResizing={!EditEnabled}
                style={{
                    border: EditEnabled ? 'none' : '1px dashed #aaa',
                    overflow: 'hidden',
                    zIndex: 10,  // Make sure the profile image stays on top
                }}
            >
                <img
                    src={require('../images/profile-avatar.png')} // Add your actual image path here
                    alt="Profile"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '50%',
                    }}
                />
            </Rnd>

            {/* Lock/Unlock Button */}
            <button
                onClick={() => setEditMode(!EditEnabled)}
                style={{
                    padding: '8px 12px',
                    backgroundColor: EditEnabled ? '#2C3E50' : '#16A085',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    marginBottom: '20px',
                }}
            >
                {EditEnabled ? 'Edit Mode' : 'Display Mode'}
            </button>

            <div
                style={{
                    position: 'relative',
                    width: '100%',
                    height: '500px',
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    overflow: 'hidden',
                    padding: '20px',
                }}
            >
                {/* Product Image */}
                <Rnd
                    size={{
                        width: positions.image.width,
                        height: positions.image.height,
                    }}
                    position={{
                        x: positions.image.x,
                        y: positions.image.y,
                    }}
                    onDragStop={(e, d) =>
                        setPositions((prev) => ({
                            ...prev,
                            image: { ...prev.image, x: d.x, y: d.y },
                        }))
                    }
                    onResizeStop={(e, direction, ref, delta, position) =>
                        setPositions((prev) => ({
                            ...prev,
                            image: {
                                x: position.x,
                                y: position.y,
                                width: parseInt(ref.style.width, 10),
                                height: parseInt(ref.style.height, 10),
                            },
                        }))
                    }
                    disableDragging={EditEnabled}
                    enableResizing={!EditEnabled}
                    style={{
                        border: EditEnabled ? 'none' : '1px dashed #aaa',
                        overflow: 'hidden',
                    }}
                >
                    <img
                        src={require('../images/product-image.png')}
                        alt="Product"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '4px',
                        }}
                    />
                </Rnd>

                {/* Editable Fields */}
                {editableField('name', fields.name, (value) =>
                    setFields({ ...fields, name: value })
                )}
                {editableField('price', fields.price, (value) =>
                    setFields({ ...fields, price: value })
                )}
                {editableField('quantity', fields.quantity, (value) =>
                    setFields({ ...fields, quantity: value })
                )}
                {editableField('description', fields.description, (value) =>
                    setFields({ ...fields, description: value })
                )}

                {/* Add to Inventory Button (Picking) */}
                {!EditEnabled && (
                    <Rnd
                        size={{ width: positions.addToInventoryPicking.width, height: positions.addToInventoryPicking.height }}
                        position={{ x: positions.addToInventoryPicking.x, y: positions.addToInventoryPicking.y }}
                        onDragStop={(e, d) =>
                            setPositions((prev) => ({
                                ...prev,
                                addToInventoryPicking: { x: d.x, y: d.y },
                            }))
                        }
                        onResizeStop={(e, direction, ref, delta, position) =>
                            setPositions((prev) => ({
                                ...prev,
                                addToInventoryPicking: {
                                    x: position.x,
                                    y: position.y,
                                    width: parseInt(ref.style.width, 10),
                                    height: parseInt(ref.style.height, 10),
                                },
                            }))
                        }
                        disableDragging={EditEnabled}
                        enableResizing={!EditEnabled}
                        style={{
                            border: '1px dashed #aaa',
                            padding: '10px',
                            backgroundColor: '#F39C12',
                            color: 'white',
                            textAlign: 'center',
                            cursor: 'pointer',
                        }}
                    >
                        Add to Inventory (Picking)
                    </Rnd>
                )}

                {/* Confirm Button */}
                {!EditEnabled && (
                    <Rnd
                        size={{ width: positions.confirm.width, height: positions.confirm.height }}
                        position={{ x: positions.confirm.x, y: positions.confirm.y }}
                        onDragStop={(e, d) =>
                            setPositions((prev) => ({
                                ...prev,
                                confirm: { x: d.x, y: d.y },
                            }))
                        }
                        onResizeStop={(e, direction, ref, delta, position) =>
                            setPositions((prev) => ({
                                ...prev,
                                confirm: {
                                    x: position.x,
                                    y: position.y,
                                    width: parseInt(ref.style.width, 10),
                                    height: parseInt(ref.style.height, 10),
                                },
                            }))
                        }
                        disableDragging={EditEnabled}
                        enableResizing={!EditEnabled}
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
                )}

                {/* Real Add to Inventory Button (Hidden in Edit Mode) */}
                {EditEnabled && (
                    <button
                        onClick={handleAddToInventory}
                        style={{
                            position: 'absolute',
                            bottom: '50px',
                            right: '100px',
                            padding: '10px 20px',
                            backgroundColor: '#F39C12',
                            color: 'white',
                            fontSize: '14px',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                    >
                        Add to Inventory
                    </button>
                )}
            </div>
        </div>
    );
}

export default Home;
