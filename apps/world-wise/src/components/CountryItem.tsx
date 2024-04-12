import styles from "./CountryItem.module.css";
import { CountryItemT } from "../type";

export default function CountryItem({ country }: { country: CountryItemT }) {
  return (
    <li className={styles.countryItem}>
      <span>{country.emoji}</span>
      <span>{country.country}</span>
    </li>
  );
}
