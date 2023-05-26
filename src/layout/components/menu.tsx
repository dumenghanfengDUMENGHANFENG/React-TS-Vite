import { Menu } from "antd";
const LayoutMenu: React.FC = () => {
  const { layoutStore } = useStore();
  const navigate = useNavigate();
  const onClick = ({ key }: { keyPath: string[]; key: string }) => {
    navigate(`${key}`);
  };

  return (
    <Observer>
      {() => (
        <Menu
          defaultOpenKeys={layoutStore.asidePath}
          selectedKeys={layoutStore.asidePath}
          mode="inline"
          theme="dark"
          items={layoutStore.asideIconList}
          onClick={onClick}
        />
      )}
    </Observer>
  );
};

export default LayoutMenu;
