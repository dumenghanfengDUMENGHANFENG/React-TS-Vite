import { Button, Form, Input } from "antd";
import { LoginApis } from "@/apis/login";
import "./login.scss";
import { saveToken } from "@/utils/cookie";
const Login: React.FC = () => {
  const navigate = useNavigate();
  const onFinish = (values: any) => {
    console.log("Success:", values);
    LoginApis.login()
      .then((res: any) => {
        saveToken(res.data.token);
        navigate(`/workbench`);
        console.log(res, "成功");
      })
      .catch((err: any) => {
        console.log("失败", err);
      });
  };
  return (
    <div id="login">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="账号"
          name="username"
          rules={[{ required: true, message: "请输入帐号!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: "请输入密码!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
