import { memo } from "react";

export default memo(function ToggleSounds({
  allowSound,
  setAllowSound,
}: {
  allowSound: boolean;
  setAllowSound: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <button className="btn-sound" onClick={() => setAllowSound((allow) => !allow)}>
      {allowSound ? "🔈" : "🔇"}
    </button>
  );
});
