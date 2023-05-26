// import { useState, createRef, useMemo } from "react";
import ComponentNew from "@/components/componentNew";
/*
  useState设置响应式数据,第一个值,第二个修改方法
  修改方法为异步,即有响应时间
  可直接修改setCoutent(coutent + 1)这种情况为页面不复杂的情况
  setCoutent((coutent) => coutent + 1) 函数式修改可永远保持最新
*/
const Component: React.FC = () => {
  const divRef = createRef<HTMLDivElement>();
  const [coutent, setCoutent] = useState(0);
  const coutentUseMemo = useMemo(() => {
    console.log("22222");
    return "coutent" + coutent;
  }, [coutent]);
  const coutentClick = (item: number) => {
    setCoutent(item);
  };

  const [titleNew, setTitleNew] = useState<string | undefined>();
  // type a = {
  //   a: string;
  // };
  // const [titleNew1, setTitleNew1] = useState<Nullable<a>>();
  const titleClick = (item: string) => {
    setTitleNew(item);
  };
  const refCLick = () => {
    console.log(divRef, "divRef");
  };
  return (
    <div>
      <div> coutentUseMemo: {coutentUseMemo}</div>父
      <div onClick={() => setCoutent(coutent + 1)}>父点击</div>
      <div onClick={() => setCoutent((coutent) => coutent + 1)}>父点击</div>
      <div>{titleNew || "无"}</div>
      <div>coutent:{coutent}</div>
      ----------------------- 子{/* 非ref */}
      {/* <ComponentNew
        ref={divRef}
        title="测试"
        text="默认改text"
        coutent={coutent}
        titleClick={titleClick}
        coutentClick={coutentClick}
      ></ComponentNew> */}
      {/* ref */}
      <ComponentNew
        ref={divRef}
        title="测试"
        text="默认改text"
        coutent={coutent}
        titleClick={titleClick}
        coutentClick={coutentClick}
      />
      <div onClick={refCLick}>refCLick点击</div>
    </div>
  );
};

export default Component;
