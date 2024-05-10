import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import ButtonIcon from "../../components/button/ButtonIcon";
import { useTheme } from "../../context";

function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return <ButtonIcon onClick={toggleDarkMode}>{isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}</ButtonIcon>;
}

export default DarkModeToggle;
