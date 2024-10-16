import Menu from "./components/Menu";
import Footer from "./components/Footer";
import { NotificationsProvider } from "./context/notificationsContext";
import { AnecdotesProvider } from "./context/anecdotesContext";

const App = () => {
  return (
    <div>
      <h1>Software anecdotes</h1>
      <NotificationsProvider>
        <AnecdotesProvider>
          <Menu />
          <Footer />
        </AnecdotesProvider>
      </NotificationsProvider>
    </div>
  );
};

export default App;
