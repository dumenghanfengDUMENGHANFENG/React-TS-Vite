const listDome: React.FC = () => {
  const list = [1, 2, 3];
  const divRef = createRef<HTMLDivElement>();
  const divClick = () => {
    console.log(divRef);
  };
  return (
    <div>
      {list.map((ele) => {
        return <div key={ele}>{ele}</div>;
      })}
      <div ref={divRef}>ref</div>
      <div onClick={divClick}>点击</div>
    </div>
  );
};
export default listDome;
