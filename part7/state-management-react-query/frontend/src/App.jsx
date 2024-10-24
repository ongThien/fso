import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { useUser } from "./hooks";
import { BrowserRouter as Router } from "react-router-dom";

const App = () => {
  const user = useUser();

  if (!user) {
    return <LoginPage />;
  }

  return (
    <Router>
      <HomePage />
    </Router>
  );
};

export default App;
