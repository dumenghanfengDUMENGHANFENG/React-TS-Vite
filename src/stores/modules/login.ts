export type IMobxStore = {
  siderOpening: boolean;
  siderOpeningChange: () => void;
  name: number;
  setName(): void;
};
import { makePersistable } from "mobx-persist-store";
class loginStore implements IMobxStore {
  siderOpening = false;
  siderOpeningChange = () => {
    this.siderOpening = !this.siderOpening;
  };
  name = 0;
  setName = () => {
    this.name++;
  };
  constructor() {
    makeAutoObservable(this);
    // 数据持续化
    makePersistable(this, {
      // 在构造函数内使用 makePersistable
      name: "loginStore", // 保存的name，用于在storage中的名称标识，只要不和storage中其他名称重复就可以
      properties: ["name"], // 要保存的字段,不写在这里面的字段将不会被保存，刷新页面也将丢失：get字段例外。get数据会在数据返回后再自动计算
      storage: window.localStorage // 保存的位置localStorage，sessionstorage
    });
  }
}
export default loginStore;
