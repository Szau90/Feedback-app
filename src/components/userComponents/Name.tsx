const Name: React.FC<{ name: string }> = ({ name }) => {
  return (
    <>
      <div className="text-body3 text-custom-very-dark-gray md:text-h4">
        {name}
      </div>
    </>
  );
};

export default Name;
