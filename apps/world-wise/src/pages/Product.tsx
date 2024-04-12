import styles from "./Product.module.css";
import PageNav from "../components/PageNav";

export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav />
      <section>
        <img src="img-1.jpg" alt="person with dog overlooking mountain with sunset" />
        <div>
          <h2>About WorldWide.</h2>
          <p>This is the product description.</p>
        </div>
      </section>
    </main>
  );
}
