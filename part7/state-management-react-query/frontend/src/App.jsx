import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { useUser } from "./hooks";

const App = () => {
  const user = useUser();

  if (!user) {
    return <LoginPage />;
  }

  return <HomePage />;
};

export default App;
