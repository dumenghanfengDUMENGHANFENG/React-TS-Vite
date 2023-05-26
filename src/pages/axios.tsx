import { AxiosApis } from "../apis/axios";
const AxiosDemo: React.FC = () => {
  AxiosApis.login()
    .then((res: any) => {
      console.log(res, "成功");
    })
    .catch((err: any) => {
      console.log("失败", err);
    });
  return (
    <div>
      <div>AxiosDemo</div>
    </div>
  );
};
export default AxiosDemo;
