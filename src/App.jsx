import React, { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [counter, setCounter] = useState(0);

  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const response = await axios.get("/api/items");
      setItems(response.data);
      console.log(items);
    };

    fetchItems();
  }, []);

  const addItem = async () => {
    const response = await axios.post("/api/items", newItem);
    setItems([...items, response.data]);
  };

  // const handleClick = () => setCounter(counter + 1);
  return (
    <div>
      <h1>Items List</h1>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const newItem = { name: e.target.elements.name.value };
          console.log(e);
          addItem(newItem);
        }}
      >
        <input type="text" name="name" placeholder="Item Name" />
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
}
