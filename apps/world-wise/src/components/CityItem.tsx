import { CityItemT } from "../type";
import styles from "./CityItem.module.css";
import { formatDate } from "../utils";
import { Link } from "react-router-dom";
import { useCities } from "../contexts/index";

export default function CityItem({ city }: { city: CityItemT }) {
  const { currentCity, deleteCity } = useCities();
  const { emoji, cityName, date, id, position } = city;

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    id && deleteCity?.(id);
  }

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${id === currentCity?.id ? styles["cityItem--active"] : ""}`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn} onClick={handleClick}>
          &times;
        </button>
      </Link>
    </li>
  );
}
