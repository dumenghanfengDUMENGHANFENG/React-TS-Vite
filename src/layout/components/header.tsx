import { Layout, Button, Select } from "antd";
import { LayoutApis } from "@/apis/layout";
import { delToken } from "@/utils/cookie";
const { Header } = Layout;
const LayoutHeader: React.FC = () => {
  const { layoutStore } = useStore();
  const navigate = useNavigate();
  useEffect(() => {
    getHeadersList();
  }, [layoutStore.headersPath]);
  const getAsideList = async (id: string) => {
    const res = await LayoutApis.asideList({ id });
    layoutStore.setHeadersPath(id);
    layoutStore.setAsideList(res.data);
    layoutStore.setAsidePath(["/workbench"]);
    layoutStore.closeTabsAll();
    navigate(`/workbench`);
  };
  const getHeadersList = async () => {
    const res = await LayoutApis.headersList({ id: layoutStore.headersPath });
    layoutStore.setHeadersList(res.data);
  };
  const handleChange = (value: string) => {
    getAsideList(value);
  };
  const siderOpeningClick = () => {
    layoutStore.siderOpeningChange();
  };
  const logOut = () => {
    delToken();
    layoutStore.resetState();
    navigate(`/login`);
  };
  return (
    <Header className="layoutHeader">
      <Observer>
        {() => (
          <Button
            className="siderOpeningChange"
            type="text"
            icon={lazyLoadIcon(
              layoutStore.siderOpening
                ? "MenuUnfoldOutlined"
                : "MenuFoldOutlined"
            )}
            onClick={siderOpeningClick}
            size="small"
          />
        )}
      </Observer>
      <Observer>
        {() => (
          <Select
            defaultValue={layoutStore.headersPath}
            style={{ width: 120 }}
            onChange={handleChange}
            options={layoutStore.headersList.map((ele) => {
              return { value: ele.id, label: ele.name };
            })}
          />
        )}
      </Observer>
      <Button type="link" onClick={logOut}>
        退出
      </Button>
    </Header>
  );
};
export default LayoutHeader;
