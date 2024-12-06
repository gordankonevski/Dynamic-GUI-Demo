# Dynamic GUI Prototype with Editable Fields and Resizable/Movable Components


This project is a dynamic, interactive platform that enables developers to brainstorm ideas, visualize concepts, and align on development goals. With features like resizable, movable, and editable components, it provides a flexible space to prototype and refine project plans collaboratively.

By offering a centralized visual workspace, the tool fosters better communication, ensures clarity across teams, and helps bridge the gap between ideas and implementation. It’s an efficient way to explore possibilities, document plans, and set the foundation for successful development.

### 1. **Editable Product Details**
- Clickable and editable fields for product attributes like name, price, quantity, and description.
- Intuitive inline editing with type-specific inputs (e.g., text for names, numbers for quantities).
- Dynamic font customization for each field, showcasing flexibility and attention to detail.

### 2. **Resizable and Movable UI Elements**
- All elements, including images and buttons, are implemented using the `react-rnd` library, allowing:
  - Dragging and repositioning elements freely.
  - Resizing components to suit different layouts and screen sizes.

### 3. **Dual Interaction Modes**
- **Edit Mode**: Enables field editing, component resizing, and drag-and-drop positioning.
- **Display Mode**: Locks the layout and presents a polished, finalized UI for viewing.

### 4. **Profile Image Integration**
- A draggable and resizable profile image, placed outside the product container.
- Demonstrates layered positioning and interaction across components.

### 5. **Inventory Management**
- "Add to Inventory" functionality allows dynamic saving of product details.
- Built using React Context API to efficiently manage and share application state.

### 6. **Clean, Modern Design**
- Responsive layout with focus on usability and clean aesthetics.
- Highlights adaptability and design skills for creating intuitive user experiences.

## Live Demo
Explore the project live:  
[Dynamic GUI Prototype](https://konevski-projectsubmission.netlify.app/)

## Technologies Demonstrated
- **React.js**: Core framework for building the interactive UI.
- **React-RND**: Library for drag-and-drop and resizable components.
- **React Context API**: Efficient state management for shared application data.
- **CSS-in-JS**: Inline styling for dynamic and adaptable UI design.

## How to Use
1. Launch the live demo linked above.
2. Toggle between **Edit Mode** and **Display Mode** using the button at the top.
3. In **Edit Mode**:
   - Click on any product field to edit its content directly.
   - Drag or resize images, text fields, and buttons to customize the layout.
4. Save product details to inventory using the "Add to Inventory" button.

## Project Structure
src/ ├── components/ │ ├── Home.js # Main component for the dynamic GUI │ ├── Inventory.js # Inventory display and management ├── context/ │ ├── InventoryContext.js # Context for managing inventory state ├── images/ │ ├── product-image.png # Default product image │ ├── profile-image.png # Profile image for the UI ├── App.js # Entry point for the application ├── index.js # React DOM rendering


---

This project reflects a strong ability to develop dynamic, user-friendly interfaces with modern web development practices, showcasing a keen eye for design and attention to detail. If you have any questions or would like to discuss the project further, feel free to reach out!
