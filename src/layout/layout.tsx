import "@/style/layout.scss";
import { Layout } from "antd";
import LayoutHeader from "./components/header";
import Menu from "./components/menu";
import Tabs from "./components/tabs";
import { Outlet } from "react-router-dom";
const { Sider, Content } = Layout;
const LayoutConmponent: React.FC = () => {
  const { layoutStore } = useStore();
  return (
    <Layout id="layout">
      {/* 左侧 */}
      <Observer>
        {() => (
          <Sider
            className="layoutAside"
            trigger={null}
            collapsible
            collapsed={layoutStore?.siderOpening}
          >
            {/* logo */}
            <div className="logo" />
            {/* 列表 */}
            <Menu />
          </Sider>
        )}
      </Observer>

      {/* 右侧 */}
      <Layout className="layoutMain">
        {/* 顶部 */}
        <LayoutHeader />
        {/* 标签 */}
        <Tabs />
        {/* 内容 */}
        <Content className="layoutContent">
          <Outlet></Outlet>
        </Content>
      </Layout>
    </Layout>
  );
};

export default memo(LayoutConmponent);
