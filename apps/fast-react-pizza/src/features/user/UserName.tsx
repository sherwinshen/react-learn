import { useAppSelector } from "../../store";

function UserName() {
  const username = useAppSelector((state) => state.user.username);

  if (!username) return null;

  return (
    <div className="hidden text-sm font-semibold md:block">{username}</div>
  );
}

export default UserName;
