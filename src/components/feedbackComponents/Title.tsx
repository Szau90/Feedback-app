const Title: React.FC<{ title: string; mdWidth: string; xlWidth: string }> = ({
  title,
  mdWidth,
  xlWidth,
}) => {
  return (
    <h1
      className={`w-[278px] text-[13px] font-bold tracking-[-0.18px] text-custom-very-dark-gray ${mdWidth}  md:text-h3 ${xlWidth}`}
    >
      {title}
    </h1>
  );
};

export default Title;
