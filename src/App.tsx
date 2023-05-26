import { BrowserRouter } from "react-router-dom";
import RoutesDemo from "@/routes";
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <RoutesDemo />
    </BrowserRouter>
  );
};

export default App;
