const Workbench: React.FC = () => {
  const navigate = useNavigate();
  const navigateClick = () => {
    navigate("/react/list-dom");
  };
  const navigateClick1 = () => {
    navigate("/react/mobx");
  };
  return (
    <div>
      <div>Workbench</div>
      ---------------
      <div onClick={navigateClick}>跳转list-dom</div>
      --------------------
      <div onClick={navigateClick1}>跳转Mobx</div>
    </div>
  );
};
export default Workbench;
