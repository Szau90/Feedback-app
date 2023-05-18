const MainBtn: React.FC<{
  label: string;
  action: () => void;
  background: string;
}> = (props) => {
  const { label, action, background } = props;
  return (
    <>
      <button onClick={action} className={`h-[40px] w-full rounded-[10px] ${background} text-[15px] text-body3 text-white md:h-[44px] `}>
        {label}
      </button>
    </>
  );
};

export default MainBtn;
