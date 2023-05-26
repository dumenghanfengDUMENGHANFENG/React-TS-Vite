import { Tabs, Dropdown, Space } from "antd";
import { keyHandle } from "@/routes/router-handle";
type TargetKey = React.MouseEvent | React.KeyboardEvent | string;
const TabsDemo: React.FC = () => {
  const { layoutStore } = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  // 点击
  const onChange = (key: string) => {
    navigate(`${key}`);
    // layoutStore.setAsidePath(keyHandle(key));
  };
  // 删除
  const remove = (targetKey: TargetKey) => {
    layoutStore.removeTabsList(targetKey.toString());
  };

  const items = [
    {
      key: "1",
      // label: "刷新页面"
      label: <div onClick={() => dropdownClick("1")}>刷新页面</div>
    },
    {
      key: "2",
      label: <div onClick={() => dropdownClick("2")}>关闭其他</div>
    },
    {
      key: "3",
      label: <div onClick={() => dropdownClick("3")}>关闭全部</div>
    }
  ];
  const dropdownClick = (item: string) => {
    switch (item) {
      case "1":
        window.location.reload();
        break;
      case "2":
        layoutStore.closeOtherTabs(location.pathname);
        break;
      case "3":
        layoutStore.setAsidePath(["/workbench"]);
        navigate("/workbench");
        layoutStore.closeTabsAll();
        break;
      default:
        break;
    }
  };
  return (
    <div className="layoutTabs">
      <Observer>
        {() => (
          <Tabs
            className="tabsLeft"
            hideAdd
            onChange={onChange}
            activeKey={layoutStore.asidePath[0]}
            type="editable-card"
            onEdit={remove}
            items={[...layoutStore.tabsList]}
          />
        )}
      </Observer>
      <div className="tabsRight">
        <Dropdown menu={{ items }}>
          <a>
            <Space>
              标签操作
              {lazyLoadIcon("DownOutlined")}
            </Space>
          </a>
        </Dropdown>
      </div>
    </div>
  );
};

export default TabsDemo;
