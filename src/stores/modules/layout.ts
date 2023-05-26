import { makePersistable, isHydrated } from "mobx-persist-store";
import {
  routerType,
  routerListIconList,
  keyHandle
} from "@/routes/router-handle";
type tabsType = { label: string | undefined; key: string };

type layoutStoreType = {
  siderOpening: boolean;
  siderOpeningChange: () => void;
  asidePath: string[];
  setAsidePath: (item: string[]) => void;
  asideList: routerType[];
  asideIconList: routerType[];
  setAsideList: (item: routerType[]) => void;
  headersPath: string;
  setHeadersPath: (item: string) => void;
  headersList: OptionType[];
  setHeadersList: (item: OptionType[]) => void;
  tabsList: tabsType[];
  addTabsList: (item: tabsType) => void;
  removeTabsList: (key: string) => void;
  closeTabsAll: () => void;
  resetState: () => void;
};

export class layoutStore implements layoutStoreType {
  // 侧边栏开合
  siderOpening = false;
  siderOpeningChange = () => {
    this.siderOpening = !this.siderOpening;
  };
  // 侧边栏选中
  asidePath = ["/workbench"];
  setAsidePath = (item: string[]) => {
    this.asidePath = item;
  };
  // 侧边栏数据
  asideList: routerType[] = [];
  get asideIconList() {
    return routerListIconList(this.asideList);
  }
  setAsideList = (item: routerType[]) => {
    this.asideList = item;
  };
  // 顶部模块列表
  headersPath = "react";
  setHeadersPath = (item: string) => {
    this.headersPath = item;
  };
  headersList: OptionType[] = [];
  setHeadersList = (item: OptionType[]) => {
    this.headersList = item;
  };
  // tabs列表
  tabsList: tabsType[] = [
    {
      key: "/workbench",
      label: "workbench"
    }
  ];
  // 新增标签
  addTabsList(item: tabsType) {
    const index = this.tabsList.findIndex((ele) => ele.key === item.key);
    if (index === -1) {
      this.tabsList.push(item);
    }
  }
  // 删除标签
  removeTabsList(key: string) {
    if (key === "/workbench") return;
    const index = this.tabsList.findIndex(
      (ele: { key: string }) => ele.key === key
    );
    this.tabsList.splice(index, 1);
    const asidePathIndex = this.asidePath.findIndex((ele) => ele === key);
    if (asidePathIndex !== -1) {
      if (index < this.tabsList.length) {
        this.asidePath = keyHandle(this.tabsList[index].key);
      } else {
        this.asidePath = keyHandle(this.tabsList[index - 1].key);
      }
    }
  }
  // 关闭其它标签
  closeOtherTabs(key: string) {
    const currentObj: any = this.tabsList.find(
      (ele: { key: string }) => ele.key === key
    );
    const oneObj: any = this.tabsList[0];
    this.tabsList = [].concat(oneObj, currentObj);
  }
  // 关闭全部
  closeTabsAll() {
    this.tabsList = [
      {
        key: "/workbench",
        label: "workbench"
      }
    ];
  }
  // 重置
  resetState() {
    this.siderOpening = false;
    this.asidePath = ["/workbench"];
    this.tabsList = [
      {
        key: "/workbench",
        label: "workbench"
      }
    ];
  }
  // 数据长久储存,在更新后判定是否完成 isHydrated
  get isHydrated() {
    return isHydrated(this);
  }
  constructor() {
    makeAutoObservable(this);
    // 数据持续化
    makePersistable(this, {
      // 在构造函数内使用 makePersistable
      name: "layoutStore", // 保存的name，用于在storage中的名称标识，只要不和storage中其他名称重复就可以
      properties: ["siderOpening", "asidePath", "headersPath", "tabsList"], // 要保存的字段,不写在这里面的字段将不会被保存，刷新页面也将丢失：get字段例外。get数据会在数据返回后再自动计算
      storage: window.localStorage // 保存的位置localStorage，sessionstorage
    }).then(() => {
      // console.log(this, "this");
    });
  }
}
