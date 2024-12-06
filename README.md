# Dynamic GUI Prototype
## With Editable Fields and Resizable/Movable Components

This project is a **React-based dynamic graphical user interface (GUI) prototype** designed to simulate product display and customization. The prototype provides an interactive canvas for dynamically editing, resizing, and moving UI elements such as product fields, images, and buttons. Users can toggle between **Edit Mode** and **Display Mode**, providing flexibility for both designing and viewing the UI.

## Features

### 1. **Editable Product Fields**
- Users can click on product fields (e.g., name, price, quantity, description) to edit their content directly.
- Supports different input types such as text and numbers.
- Font styles for individual fields can be dynamically customized.

### 2. **Resizable and Movable Components**
- Core UI elements, including product fields, images, and buttons, are implemented using the `react-rnd` library.
- Users can resize and move components freely in **Edit Mode**, providing a customizable layout.

### 3. **Interactive Modes**
- **Edit Mode**: Enables resizing, dragging, and field editing with visual indicators (e.g., dashed borders).
- **Display Mode**: Locks the layout for a clean, final presentation.

### 4. **Profile Image**
- A draggable and resizable profile image is positioned outside the product container.
- Always remains on top of other elements for easy customization.

### 5. **Inventory Management**
- Users can add products to an inventory with the "Add to Inventory" button in **Edit Mode**.
- The inventory context handles product details dynamically.

### 6. **Customizable Layout**
- Position and size of all elements are stored in the component state, allowing full control over their placement.

## Live Demo
You can view and interact with the project live at:  
[Dynamic GUI Prototype](https://konevski-projectsubmission.netlify.app/)

## Technologies Used
- **React.js**: The foundation of the dynamic UI.
- **React-RND**: For draggable and resizable components.
- **React Context API**: For managing inventory and shared state across components.
- **CSS-in-JS**: Inline styles for responsive and dynamic UI design.
- **Node.js**

