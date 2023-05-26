import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
// 判断当前用户是否登录没有登录跳转登录页
const Appraisal = ({ children }: any) => {
  const userInfo: any = sessionStorage.getItem("userInfo");
  return userInfo ? children : <Navigate to="/login" />;
};
// 判断当前页面是否是登录页面，如果是登录页面，则清空sesseion,登录之后重新进行数据存储
const AppLogin = ({ children }: any) => {
  return children;
};
const lazyLoad = (moduleName: string) => {
  const viteModule = import.meta.glob("../**/**");
  //组件地址
  const URL = `../pages/${moduleName}/index.tsx`;
  const Module = React.lazy(viteModule[`${URL}`] as any);
  // fallback={<Loading />}
  return (
    <React.Suspense>
      <Module />
    </React.Suspense>
  );
};
export const mainRouteConfig: Route[] = [
  {
    path: "/",
    title: "首页",
    element: <Appraisal>{lazyLoad("Layout")}</Appraisal>,
    children: [
      {
        path: "/",
        title: "首页",
        element: <Appraisal>{lazyLoad("Home")}</Appraisal>
      }
    ]
  },
  {
    path: "/login",
    title: "登录",
    element: <AppLogin>{lazyLoad("Login")}</AppLogin>
  }
];
export type Route = {
  path: string;
  name?: string;
  title?: string;
  exact?: boolean;
  element: any;
  noAuth?: boolean;
  children?: Route[];
  type?: string;
};
export type menuList = {
  label: string;
  element?: any;
  path: string;
  type: string;
  children?: menuList[];
};
