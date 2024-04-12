import { PostProvider } from "./contexts/usePostContext";
import Header from "./components/Header";
import Main from "./components/Main";
import Archive from "./components/Archive";
import Footer from "./components/Footer";
import ThemeButton from "./components/ThemeButton";

function App() {
  return (
    <PostProvider>
      <section>
        <ThemeButton />
        <Header />
        <Main />
        <Archive />
        <Footer />
      </section>
    </PostProvider>
  );
}

export default App;
