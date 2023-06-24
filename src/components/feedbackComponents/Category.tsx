const Category: React.FC<{ category: string }> = ({ category }) => {
  return (
    <p className="mt-[9px] w-max rounded-lg bg-custom-very-light-gray px-3 py-[5.5px] text-body3 capitalize text-custom-dark-blue ">
      {category}
    </p>
  );
};

export default Category;
