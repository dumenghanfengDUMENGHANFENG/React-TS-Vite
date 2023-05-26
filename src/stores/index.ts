import { createContext } from "react";
import { layoutStore } from "./modules/layout";
import loginStore from "./modules/login";
const storeContext = createContext({
  layoutStore: new layoutStore(),
  loginStore: new loginStore()
});
export const useStore = () => useContext(storeContext);
