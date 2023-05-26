import React, { Suspense } from "react";
import Layout from "@/layout/layout";
import ErrorPage404 from "@/pages/error-page/error-page-404";
import { loadToken } from "@/utils/cookie";
export type routerType = {
  level?: number;
  path?: string;
  key: React.Key;
  label: React.ReactNode;
  icon?: React.ReactNode;
  element?: any;
  children?: routerType[];
};

// 验证是否登录
const Appraisal = ({ children }: any) => {
  const cookie: string | false = loadToken();
  const location = useLocation();
  if (cookie) {
    const { layoutStore } = useStore();
    useEffect(() => {
      layoutStore.setAsidePath(keyHandle(location.pathname));
      layoutStore.addTabsList(
        addKeyHandle(layoutStore.asideIconList, location.pathname) || {
          label: "",
          key: ""
        }
      );
    }, [location]);
  }

  return cookie ? children : <Navigate to="/login" />;
};

// 判断当前页面是否是登录页面，如果是登录页面，则清空sesseion,登录之后重新进行数据存储
const AppLogin = ({ children }: any) => {
  const cookie: string | false = loadToken();
  const { layoutStore } = useStore();
  if (cookie) {
    layoutStore.setAsidePath(["/workbench"]);
    return <Navigate to="/workbench" />;
  } else {
    return children;
  }
};
// 生成element
const lazyLoad = (moduleName: string) => {
  const viteModule = import.meta.glob("../pages/**/*.tsx");
  const Module = lazy(viteModule[`../pages/${moduleName}.tsx`] as any);
  return (
    <Suspense>
      <Module />
    </Suspense>
  );
};
// 默认路由
export const routerListDefault: routerType[] = [
  {
    path: "/login",
    label: "login",
    key: "/login",
    element: <AppLogin>{lazyLoad("login/login")}</AppLogin>
  },
  {
    path: "/",
    label: "/",
    key: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "/workbench",
        label: "workbench",
        key: "/workbench",
        element: <Appraisal>{lazyLoad("workbench/workbench")}</Appraisal>
      }
    ]
  },
  {
    path: "*",
    label: "404",
    key: "/404",
    element: <ErrorPage404></ErrorPage404>
  }
];
// 生成动态路由
export const routerListHandle = (list: routerType[]): routerType[] => {
  if (!list || list.length === 0) return [];
  return list.map((item) => {
    const { level, element, children, ...obj } = item;
    if (level && level === 1) {
      return {
        ...obj,
        element: <Layout></Layout>,
        children: [
          {
            ...obj,
            element: <Appraisal>{lazyLoad(element)}</Appraisal>
          }
        ]
      };
    } else {
      return {
        ...obj,
        element: element ? (
          <Appraisal>{lazyLoad(element)}</Appraisal>
        ) : (
          <Layout></Layout>
        ),
        children: children ? routerListHandle(children) : undefined
      };
    }
  });
};

// 生成icon
export const routerListIconList = (list: routerType[]) => {
  return [
    {
      path: "/workbench",
      key: "/workbench",
      label: "workbench",
      icon: lazyLoadIcon("BorderRightOutlined"),
      element: lazyLoad("workbench/workbench")
    },
    ...routerListIconHandle(list)
  ];
};
export const routerListIconHandle = (list: routerType[]): routerType[] => {
  if (!list || list.length === 0) return [];
  return list.map((item) => {
    const { children, icon, ...obj } = item;
    return {
      ...obj,
      icon: icon ? lazyLoadIcon(`${icon}`) : null,
      children: children ? routerListIconHandle(children) : undefined
    };
  });
};
// 处理key
export const keyHandle = (key: string) => {
  return key.split("/").length === 2
    ? [`/${key.split("/")[1]}`]
    : [key, `/${key.split("/")[1]}`];
};
// 新增key
export const addKeyHandle = (
  list: routerType[],
  path: string
): { label: string; key: string } | null => {
  for (let i = 0; i < list.length; i++) {
    const { key, label, children } = list[i];
    if (key === path) {
      return {
        label: label?.toString() || "",
        key
      };
    } else {
      const obj: { label: string; key: string } | null = addKeyHandle(
        children || [],
        path
      );
      if (obj) return obj;
    }
  }
  return null;
};
