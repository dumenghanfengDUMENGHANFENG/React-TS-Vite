// import { request } from "./request";
export const AxiosApis = {
  login(kvs?: any) {
    return request({
      url: "/custodianManagement/menuManagement/GetPageList",
      method: "get",
      kvs
    });
  }
};
