type typeProps = {
  ref?: any;
  title: string;
  text?: string;
  coutent: number;
  titleClick: (item: string) => void;
  coutentClick: (item: number) => void;
};

// 非ref
// const componentNew: React.FC<typeProps> = ({
//   title,
//   text = "text默认",
//   coutent,
//   titleClick,
//   coutentClick
// }) => {
//   const componentNewCLick = () => {
//     titleClick("儿子传值");
//   };
//   const componentNewCoutentCLick = () => {
//     coutentClick(coutent++);
//   };
//   return (
//     <div>
//       <div>标题-----{title}</div>
//       <div>标题name-----{text}</div>
//       {coutent}
//       <div onClick={componentNewCLick}>点击</div>
//       <div onClick={componentNewCoutentCLick}>content点击</div>
//     </div>
//   );
// };
// const componentNew: React.FC = forwardRef<HTMLDivElement, typeProps>(
//   (props, ref) => {
//     console.log(props);
//     return (
//       <div>
//         <div ref={ref}>子</div>
//       </div>
//     );
//   }
// );

// ref
const ComponentNew = forwardRef<HTMLDivElement, typeProps>(
  ({ title, text = "text默认", coutent, titleClick, coutentClick }, ref) => {
    const componentNewCLick = () => {
      titleClick("儿子传值");
    };
    console.log("1111");
    const componentNewCoutentCLick = () => {
      coutentClick(coutent++);
    };
    return (
      <div ref={ref}>
        <div>标题-----{title}</div>
        <div>标题name-----{text}</div>
        {coutent}
        <div onClick={componentNewCLick}>点击</div>
        <div onClick={componentNewCoutentCLick}>content点击</div>
      </div>
    );
  }
);
export default ComponentNew;
