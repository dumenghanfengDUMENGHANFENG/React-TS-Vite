/*
cookie
TOKEN_KEY cookie名称
saveToken 存储cookie
loadToken 获取cookie
delToken 删除cookie
*/
import Cookies from "react-cookies";
export const TOKEN_KEY = "React-Vite-Ant-Cookies";
export const saveToken = (token: string) => {
  Cookies.save(TOKEN_KEY, token, { path: "/" });
};

export const loadToken = () => {
  const token = Cookies.load(TOKEN_KEY);
  if (token) return token;
  else return false;
};

export const delToken = () => {
  Cookies.remove(TOKEN_KEY);
};
