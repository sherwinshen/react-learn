import { useState } from "react";
import Logo from "./components/Logo";
import Form from "./components/Form";
import PackingList from "./components/PackingList";
import Stats from "./components/Stats";
import { ItemType } from "./type";

function App() {
  const initialItems = [
    { id: 1, description: "Passports", quantity: 2, packed: false },
    { id: 2, description: "Socks", quantity: 12, packed: false },
  ];
  const [items, setItems] = useState(initialItems);

  const handleAddItems = (item: ItemType) => {
    setItems([...items, item]);
  };
  const handleClearList = () => {
    setItems([]);
  };
  const handleToggleItem = (id: number) => {
    setItems((items) => items.map((item) => (item.id === id ? { ...item, packed: !item.packed } : item)));
  };
  const handleDeleteItem = (id: number) => {
    setItems((items) => items.filter((item) => item.id !== id));
  };

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onClearList={handleClearList}
        onToggleItem={handleToggleItem}
        onDeleteItem={handleDeleteItem}
      />
      <Stats items={items} />
    </div>
  );
}

export default App;
