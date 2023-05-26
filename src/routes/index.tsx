import { LayoutApis } from "@/apis/layout";
import { routerListDefault, routerListHandle } from "@/routes/router-handle";

// import { useLocation, useNavigate } from 'react-router-dom';
const RoutesDemo: React.FC = () => {
  const { layoutStore } = useStore();
  const [routerIsShow, setRouterIsShow] = useState(false); // 路由是否请求完成

  useEffect(() => {
    getAsideList();
  }, []); // 依赖项为空数组，表示只在组件挂载时发送请求
  // 请求侧边栏
  const getAsideList = async () => {
    const res = await LayoutApis.asideList({ id: layoutStore.headersPath });
    layoutStore.setAsideList(res.data);
    setRouterIsShow(true);
  };
  const routes = useRoutes(
    routerListDefault.concat(routerListHandle(layoutStore.asideList))
  ); //React要求在每次组件渲染时，Hooks的调用顺序保持一致，而将useRoutes放在组件的返回值中会导致Hooks的顺序发生变化。
  if (!routerIsShow) {
    return null;
  }

  return routes;
};

export default observer(RoutesDemo);

/* <Appraisal>{lazyLoad("Layout")}</Appraisal>
const Appraisal = ({ children }: any) => {
  const userInfo: any = sessionStorage.getItem("userInfo");
  return userInfo ? children : <Navigate to="/login" />;
}; */
