// src/App.tsx
import React from "react";
import "./App.css";
import ProductList from "./ProductList";

function App() {
  const handleSearch = (value: string) => {
    // Xử lý tìm kiếm ở đây
    console.log("Searching for:", value);
  };

  return (
    <div className="App">
      <div className="mt-10 ">
        <ProductList />
      </div>
    </div>
  );
}

export default App;
