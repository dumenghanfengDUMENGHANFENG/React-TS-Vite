declare global {
  // 公共类型
  type Nullable<T> = {
    [P in keyof T]: T[P] | null;
  };
  type OptionType = {
    id: string | number;
    name: string;
  };
}

export {};
