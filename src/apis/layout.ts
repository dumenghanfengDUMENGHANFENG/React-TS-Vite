export const LayoutApis = {
  asideList(kvs?: any) {
    return request({
      url: "/layout/asideList",
      method: "get",
      kvs
    });
  },
  headersList(kvs?: any) {
    return request({
      url: "/layout/headersList",
      method: "get",
      kvs
    });
  }
};
