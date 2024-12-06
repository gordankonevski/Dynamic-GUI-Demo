<div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '20px', backgroundColor: '#F4F4F4' }}>
    {/* Sidebar */}
    <div style={{ width: 250, backgroundColor: '#F1F1F1', height: '100vh', padding: '20px', borderRadius: '8px' }}>
        {/* User Profile Image */}
        <Rnd
            id="userImage"
            default={{
                x: 0,
                y: 0,
                width: sizes.userImage.width,
                height: sizes.userImage.height,
            }}
            onDragStop={(e, data) => setProductPosition({ x: data.x, y: data.y })}
            onResizeStop={(e, direction, ref, delta, position) => {
                setSizes((prevSizes) => ({
                    ...prevSizes,
                    userImage: { width: ref.offsetWidth, height: ref.offsetHeight },
                }));
            }}
            style={{
                border: '3px solid #ccc',
                borderRadius: '50%',
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '20px',
            }}
        >
            <img
                src={require('./images/profile-avatar.png')}
                alt="User Avatar"
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '50%', // Ensure the image stays circular
                }}
            />
        </Rnd>

        <h2 style={{ color: '#333', fontSize: '25px', marginTop: '100px' }}>Dynamic GUI Demo</h2>
        <div style={{ marginBottom: '20px' }}> </div>
    </div>

    {/* Main Content */}
    <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
        {/* Product Container (Fixed or Editable) */}
        <Rnd
            id="productContainer"
            className="rnd"
            default={{
                x: productPosition.x,
                y: productPosition.y,
                width: sizes.product.width,
                height: sizes.product.height,
            }}
            onDragStop={(e, data) => setProductPosition({ x: data.x, y: data.y })}
            onResizeStop={(e, direction, ref, delta, position) => {
                setSizes((prevSizes) => ({
                    ...prevSizes,
                    product: { width: ref.offsetWidth, height: ref.offsetHeight },
                }));
            }}
            enableResizing={isContainerEditable}  // Enable resizing if toggle is on
            disableDragging={!isContainerEditable}  // Disable dragging if toggle is off
            style={{
                display: 'flex',  // This ensures the contents align properly
                flexDirection: 'column',  // Stacks the child elements vertically
                justifyContent: 'flex-start',  // Aligns content from the top
                alignItems: 'center',  // Centers the content horizontally
                border: `3px solid ${color.productContainer}`,
                borderRadius: '8px',
                padding: '10px',
                backgroundColor: '#fff',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                position: 'relative',  // To position the button inside the container
            }}
        >
            {/* Toggle Button inside the Product Container */}
            <button
                onClick={() => setIsContainerEditable(!isContainerEditable)}
                style={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '10px',
                    backgroundColor: '#28a745',
                    color: '#fff',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    fontSize: '14px',
                    cursor: 'pointer',
                }}
            >
                {isContainerEditable ? 'Lock Container' : 'Unlock Container'}
            </button>

            {/* Product Image */}
            <Rnd
                id="productImage"
                default={{
                    x: imagePosition.x,
                    y: imagePosition.y,
                    width: sizes.itemImage.width,
                    height: sizes.itemImage.height,
                }}
                onDragStop={(e, data) => setImagePosition({ x: data.x, y: data.y })}
                disableDragging={false}  // Allow dragging the image
                style={{
                    border: `3px solid ${color.itemImage.border}`,
                    borderRadius: '8px',
                    overflow: 'hidden',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <img
                    src={require('./images/product-image.png')}
                    alt="Product"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '4px',
                    }}
                />
            </Rnd>

            {/* Product Details (Name, Price, Quantity, Description) */}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    marginLeft: '10px',
                    height: '100%',
                }}
            >
                {/* Name */}
                <Rnd
                    id="productName"
                    default={{
                        x: namePosition.x,
                        y: namePosition.y,
                        width: sizes.name.width,
                        height: sizes.name.height,
                    }}
                    onDragStop={(e, data) => setNamePosition({ x: data.x, y: data.y })}
                    disableDragging={editingField === 'name'}  // Disable dragging while editing
                    enableResizing={editingField !== 'name'}  // Disable resizing while editing
                    style={{
                        border: '3px solid #ccc',
                        padding: '8px',
                        marginBottom: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {editingField === 'name' ? (
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onBlur={() => setEditingField(null)}
                            autoFocus
                            style={{
                                width: '100%',
                                fontSize: '14px',
                                padding: '8px',
                                border: 'none',
                                outline: 'none',
                            }}
                        />
                    ) : (
                        <span
                            onClick={() => handleFieldClick('name')}
                            style={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                color: '#333',
                            }}
                        >
                            {name}
                        </span>
                    )}
                </Rnd>

                {/* Price */}
                <Rnd
                    id="productPrice"
                    default={{
                        x: pricePosition.x,
                        y: pricePosition.y,
                        width: sizes.price.width,
                        height: sizes.price.height,
                    }}
                    onDragStop={(e, data) => setPricePosition({ x: data.x, y: data.y })}
                    disableDragging={editingField === 'price'}  // Disable dragging while editing
                    enableResizing={editingField !== 'price'}  // Disable resizing while editing
                    style={{
                        border: '3px solid #ccc',
                        padding: '8px',
                        marginBottom: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {editingField === 'price' ? (
                        <input
                            type="text"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            onBlur={() => setEditingField(null)}
                            autoFocus
                            style={{
                                width: '100%',
                                fontSize: '14px',
                                padding: '8px',
                                border: 'none',
                                outline: 'none',
                            }}
                        />
                    ) : (
                        <span
                            onClick={() => handleFieldClick('price')}
                            style={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                color: '#333',
                            }}
                        >
                            ${price}
                        </span>
                    )}
                </Rnd>

                {/* Quantity */}
                <Rnd
                    id="productQuantity"
                    default={{
                        x: quantityPosition.x,
                        y: quantityPosition.y,
                        width: sizes.quantity.width,
                        height: sizes.quantity.height,
                    }}
                    onDragStop={(e, data) => setQuantityPosition({ x: data.x, y: data.y })}
                    disableDragging={editingField === 'quantity'}  // Disable dragging while editing
                    enableResizing={editingField !== 'quantity'}  // Disable resizing while editing
                    style={{
                        border: '3px solid #ccc',
                        padding: '8px',
                        marginBottom: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {editingField === 'quantity' ? (
                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            onBlur={() => setEditingField(null)}
                            autoFocus
                            style={{
                                width: '100%',
                                fontSize: '14px',
                                padding: '8px',
                                border: 'none',
                                outline: 'none',
                            }}
                        />
                    ) : (
                        <span
                            onClick={() => handleFieldClick('quantity')}
                            style={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                color: '#333',
                            }}
                        >
                            {quantity}
                        </span>
                    )}
                </Rnd>

                {/* Description */}
                <Rnd
                    id="productDescription"
                    default={{
                        x: descriptionPosition.x,
                        y: descriptionPosition.y,
                        width: sizes.description.width,
                        height: sizes.description.height,
                    }}
                    onDragStop={(e, data) => setDescriptionPosition({ x: data.x, y: data.y })}
                    disableDragging={editingField === 'description'}  // Disable dragging while editing
                    enableResizing={editingField !== 'description'}  // Disable resizing while editing
                    style={{
                        border: '3px solid #ccc',
                        padding: '8px',
                        marginBottom: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {editingField === 'description' ? (
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            onBlur={() => setEditingField(null)}
                            autoFocus
                            style={{
                                width: '100%',
                                fontSize: '14px',
                                padding: '8px',
                                border: 'none',
                                outline: 'none',
                            }}
                        />
                    ) : (
                        <span
                            onClick={() => handleFieldClick('description')}
                            style={{
                                fontSize: '14px',
                                cursor: 'pointer',
                                color: '#333',
                            }}
                        >
                            {description}
                        </span>
                    )}
                </Rnd>
            </div>
        </Rnd>
    </div>
</div>