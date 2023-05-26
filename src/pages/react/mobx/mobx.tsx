// import { observer } from "mobx-react-lite";
// import {  Observer } from "mobx-react-lite";
// Observer 单独的细化的避免不必要的更新 除了包裹的东西都不更新
// observer,useObserver 整体的更新

export const A = () => {
  // console.log("a");
  return <div>a</div>;
};
// 此处点击后控制台只打印1111
// const TimerView = () => {
//   const { loginStore } = useStore();
//   console.log(loginStore);
//   const clickA = () => {
//     console.log("111");
//     loginStore.setName();
//   };
//   return (
//     <div>
//       <A></A>
//       <Observer>{() => <div>{loginStore.name}</div>}</Observer>
//       <div onClick={clickA}>11111</div>
//     </div>
//   );
// };
// 此处点击后控制台打印1111和a
const TimerView: React.FC = observer(() => {
  // console.log(useStore());
  const { loginStore } = useStore();
  // console.log(loginStore);
  const clickA = () => {
    console.log("111");
    loginStore.setName();
  };
  return (
    <div>
      <A></A>
      {/* <Observer>{() => <div>{loginStore.name}</div>}</Observer> */}
      <div>{loginStore.name}</div>
      <div onClick={clickA}>11111333</div>
    </div>
  );
});

export default TimerView;
// const Mobx: React.FC<typeProps> = ({ layoutStore: { name, setName } = {} }) => {
// const Mobx: React.FC<typeProps> = ({ loginStore }) => {
//   // const { layoutStore } = props;
//   console.log(loginStore);
//   const setNameClick = () => {
//     loginStore?.setName();
//     loginStore?.setName1("layout11111修改");
//   };
//   return (
//     <div>
//       <div>
//         observable:
//         <div> {loginStore?.name}</div>
//         <div> {loginStore?.name1}</div>
//       </div>
//       ---------------------
//       <div>
//         computed:
//         <div> {loginStore?.greeting}</div>
//         <div> {loginStore?.greeting1}</div>
//       </div>
//       ---------------------
//       <div onClick={setNameClick}>action:变更</div>
//     </div>
//   );
// };

// export default inject("loginStore")(observer(Mobx));
