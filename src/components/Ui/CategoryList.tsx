import { FilterBtn } from "./FilterBtn";

const CategoryList = () => {
  const label = ["all", "ui", "ux", "enhancement", "bug", "feature"];

  return (
    <>
      <ul className="h-[178px] w-[223px] rounded-[10px] bg-white xl:h-[166px] xl:w-[255px]">
        <li className="ml-[24px] mt-[24px] flex h-[118px] w-[181px] flex-row flex-wrap">
          {label.map((filter, index) => (
            <FilterBtn key={index} label={filter} />
          ))}
        </li>
      </ul>
    </>
  );
};

export default CategoryList;
