import React, { useState, useEffect } from 'react';
import { ChromePicker } from 'react-color';

function ColorPickerTool() {
    const [color, setColor] = useState('#F39C12');
    const [isPickerOpen, setPickerOpen] = useState(false);
    const [targetElement, setTargetElement] = useState(null);
    const [pickerPosition, setPickerPosition] = useState({ top: 10, left: 10 });
    const [pickerSize, setPickerSize] = useState({ width: 300, height: 400 });
    const [isResizing, setIsResizing] = useState(false);

    const handleColorChange = (updatedColor) => setColor(updatedColor.hex);

    // Apply color to text or background of the target element
    const handleApplyColor = (isTextColor) => {
        if (targetElement) {
            if (isTextColor) {
                targetElement.style.color = color;
            } else {
                targetElement.style.backgroundColor = color;
            }
        }
    };

    // Select an element only when the picker is open
    const handleElementClick = (e) => {
        if (!isPickerOpen) return;

        // Prevent selecting the color picker tool itself
        if (e.target.closest('.color-picker-tool')) return;

        e.preventDefault();
        e.stopPropagation();

        const element = e.target;
        if (targetElement) targetElement.style.outline = 'none'; // Remove outline from previous element

        setTargetElement(element);
        element.style.outline = '2px dashed ${ color }';
    };

    // Close the picker
    const handleClosePicker = () => {
        if (targetElement) targetElement.style.outline = 'none'; // Remove outline
        setPickerOpen(false);
    };

    // Handle dragging the picker
    const handleDragStart = (e) => {
        if (isResizing) return;

        const offsetX = e.clientX - pickerPosition.left;
        const offsetY = e.clientY - pickerPosition.top;

        const handleDragMove = (moveEvent) => {
            setPickerPosition({
                left: moveEvent.clientX - offsetX,
                top: moveEvent.clientY - offsetY,
            });
        };

        const handleDragEnd = () => {
            document.removeEventListener('mousemove', handleDragMove);
            document.removeEventListener('mouseup', handleDragEnd);
        };

        document.addEventListener('mousemove', handleDragMove);
        document.addEventListener('mouseup', handleDragEnd);
    };

    // Handle resizing the picker
    const handleResizeStart = (e) => {
        e.preventDefault();
        setIsResizing(true);

        const initialWidth = pickerSize.width;
        const initialHeight = pickerSize.height;
        const initialX = e.clientX;
        const initialY = e.clientY;

        const handleResizeMove = (moveEvent) => {
            setPickerSize({
                width: Math.max(200, initialWidth + (moveEvent.clientX - initialX)),
                height: Math.max(200, initialHeight + (moveEvent.clientY - initialY)),
            });
        };

        const handleResizeEnd = () => {
            setIsResizing(false);
            document.removeEventListener('mousemove', handleResizeMove);
            document.removeEventListener('mouseup', handleResizeEnd);
        };

        document.addEventListener('mousemove', handleResizeMove);
        document.addEventListener('mouseup', handleResizeEnd);
    };

    // Add and remove element selection listener based on picker state
    useEffect(() => {
        if (isPickerOpen) {
            document.addEventListener('click', handleElementClick);
        } else {
            document.removeEventListener('click', handleElementClick);
        }

        // Cleanup event listener on unmount or when the picker is closed
        return () => {
            document.removeEventListener('click', handleElementClick);
        };
    }, [isPickerOpen]);

    return (
        <div
            className="color-picker-tool" // Add class to identify the picker tool
            style={{
                position: 'fixed',
                top: pickerPosition.top + 'px',
                left: pickerPosition.left + 'px',
                zIndex: 1000,
                backgroundColor: 'white',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
                padding: '10px',
                border: '1px solid #E1E1E1',
                cursor: isResizing ? 'grabbing' : 'move',
                width: pickerSize.width + 'px',
                height: pickerSize.height + 'px',
            }}
            onMouseDown={handleDragStart}
        >
            <div style={{ padding: '10px', textAlign: 'center' }}>
                <button
                    onClick={() => setPickerOpen(!isPickerOpen)}
                    style={{
                        backgroundColor: color,
                        border: 'none',
                        color: 'white',
                        padding: '10px 15px',
                        cursor: 'pointer',
                        borderRadius: '5px',
                        marginBottom: '10px',
                        fontSize: '14px',
                        fontWeight: 'bold',
                    }}
                >
                    {isPickerOpen ? 'Close Color Picker' : 'Open Color Picker'}
                </button>

                {!isPickerOpen && (
                    <div style={{ marginTop: '20px', color: '#555', fontSize: '14px' }}>
                        <p>
                            Click on any element on the page to apply the selected color.
                        </p>
                        <p style={{ fontSize: '12px', color: '#888' }}>
                            (Click again to change the color of the element)
                        </p>
                    </div>
                )}

                {isPickerOpen && (
                    <div>
                        <ChromePicker color={color} onChange={handleColorChange} />
                        <div style={{ marginTop: '10px' }}>
                            <button
                                onClick={() => handleApplyColor(true)} // Apply text color
                                style={{
                                    padding: '8px 15px',
                                    backgroundColor: '#27AE60',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                    marginTop: '10px',
                                }}
                            >
                                Apply Text Color
                            </button>
                            <button
                                onClick={() => handleApplyColor(false)} // Apply background color
                                style={{
                                    padding: '8px 15px',
                                    backgroundColor: '#2980B9',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                    marginTop: '10px',
                                    marginLeft: '10px',
                                }}
                            >
                                Apply Background Color
                            </button>
                            <button
                                onClick={handleClosePicker}
                                style={{
                                    padding: '8px 15px',
                                    backgroundColor: '#E74C3C',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                    marginTop: '10px',
                                    marginLeft: '10px',
                                }}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Resize Handle */}
            <div
                style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: '16px',
                    height: '16px',
                    backgroundColor: '#888',
                    cursor: 'se-resize',
                }}
                onMouseDown={handleResizeStart}
            ></div>
        </div>
    );
}

export default ColorPickerTool;