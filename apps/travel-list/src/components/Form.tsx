import React, { useState } from "react";
import { ItemType } from "../type";

export default function Form({ onAddItems }: { onAddItems: (item: ItemType) => void }) {
  const optionCount = 10;
  const options = Array.from({ length: optionCount }, (_, i) => i + 1);
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState("");
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!description) {
      alert("Please enter some description");
      return;
    }

    onAddItems({ quantity, description, packed: false, id: Date.now() });

    setDescription("");
    setQuantity(1);
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
        {options.map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></input>
      <button>Add</button>
    </form>
  );
}
