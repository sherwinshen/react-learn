import { useState } from "react";
import { ItemType } from "../type";
import Item from "./Item";

export default function PackingList({
  items,
  onClearList,
  onToggleItem,
  onDeleteItem,
}: {
  items: ItemType[];
  onClearList: () => void;
  onToggleItem: (id: number) => void;
  onDeleteItem: (id: number) => void;
}) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") sortedItems = items;

  if (sortBy === "description") sortedItems = items.slice().sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === "packed") sortedItems = items.slice().sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {(sortedItems || []).map((item) => (
          <Item item={item} key={item.id} onToggleItem={onToggleItem} onDeleteItem={onDeleteItem} />
        ))}
      </ul>
      <div className="action">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={onClearList}>Clear list</button>
      </div>
    </div>
  );
}
