import styles from "./Main.module.css";
import SideBar from "../components/SideBar";
import Map from "../components/Map";
import User from "../components/User";

export default function Main() {
  return (
    <div className={styles.app}>
      <SideBar />
      <Map />
      <User />
    </div>
  );
}
