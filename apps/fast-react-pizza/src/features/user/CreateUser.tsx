import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../ui/Button";
import { ButtonType } from "../../type";
import { useAppDispatch } from "../../store";
import { updateName } from "./userSlice";

function CreateUser() {
  const [username, setUsername] = useState<string>("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!username) return;
    dispatch(updateName(username));
    navigate("/menu");
  };

  return (
    <form onSubmit={handleSubmit}>
      <p className="mb-4 text-sm text-stone-600 md:text-base">
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input mb-8 w-72"
      />

      {username !== "" && (
        <div>
          <Button type={ButtonType.primary}>Start ordering</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
