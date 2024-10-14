import Notification from "./components/Notification";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import { NotificationContextProvider } from "./context/NotificationContext";

const App = () => {
  return (
    <div>
      <h3>Anecdote app</h3>
      <NotificationContextProvider>
        <Notification />
        <AnecdoteForm />
        <AnecdoteList />
      </NotificationContextProvider>
    </div>
  );
};

export default App;
