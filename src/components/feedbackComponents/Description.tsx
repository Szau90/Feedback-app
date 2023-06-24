const Description: React.FC<{
  description: string;
  mdWidth: string;
  xlWidth: string;
}> = ({ description, mdWidth, xlWidth }) => {
  return (
    <p
      className={`font-regular mt-[9px] w-[278px] text-[13px] text-custom-gray ${mdWidth} md:text-body1 ${xlWidth}`}
    >
      {description}
    </p>
  );
};

export default Description;
