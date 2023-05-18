import Image from "next/image";
import { useEffect, useState } from "react";

const Dropdown: React.FC<{
  placeHolder: string;
  options: string[];
  background: string;
  color: string;
  padding: string;
  position: string;
  height: string;
  width: string;
}> = ({
  placeHolder,
  options,
  background,
  color,
  padding,
  position,
  height,
  width,
}) => {
  const [showmenu, setShowmenu] = useState(false);
  const [selectedValue, setSelectedValue] = useState<null | string>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setShowmenu(!showmenu);
  };

  const getDisplay = () => {
    if (selectedValue) {
      return selectedValue;
    }
    return placeHolder;
  };

  const onItemClick = (option: string) => {
    setSelectedValue(option);
    console.log(option);
  };

  const isSelected = (options: string) => {
    if (!selectedValue) {
      return false;
    }
    return selectedValue === options;
  };

  return (
    <div className="dropdown-container relative h-full w-full text-left">
      <div
        onClick={handleClick}
        className={`dropdown-input  flex h-full w-full select-none items-center justify-between ${padding} ${background}`}
      >
        <div className={`dropdown-selected-value cursor-pointer ${color}`}>
          <span className="text-[11px] font-bold md:text-[14px]">
            {getDisplay()}
          </span>
        </div>
        {showmenu && (
          <div
            className={`dropdown-menu absolute ${position} ${height} ${width} translate-y-1 z-50 overflow-auto rounded-[10px] bg-white shadow-lg `}
          >
            {options.map((option) => (
              <div
                onClick={() => onItemClick(option)}
                key={option}
                className={`dropdown-item flex cursor-pointer justify-between border-y-[1px] border-custom-light-gray px-[24px]  py-[12.125px] text-[#647196] last:border-none hover:text-custom-purple ${
                  isSelected(option) && "selected"
                }`}
              >
                {option}
                {isSelected(option) && (
                  <Image
                    src={"/assets/shared/icon-check.svg"}
                    width={13}
                    height={11}
                    alt="check"
                    style={{ objectFit: "contain" }}
                  />
                )}
              </div>
            ))}
          </div>
        )}
        <div className="dropdown-tools ml-2">
          <div className="dropdown-tool cursor-pointer">
            <Image
              src={"/assets/shared/icon-arrow-down.svg"}
              width={10}
              height={7}
              alt="arrow down"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
