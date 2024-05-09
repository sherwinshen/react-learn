import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { useLogout } from "./useAuth";
import SpinnerMini from "../../components/SpinnerMini";
import ButtonIcon from "../../components/button/ButtonIcon";

function Logout() {
  const { logout, isLoggingOut } = useLogout();

  return (
    <ButtonIcon disabled={isLoggingOut} onClick={() => logout()}>
      {!isLoggingOut ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  );
}

export default Logout;
