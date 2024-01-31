import { DropDownIconSVG } from "../../../../../public/dashboard/DropdownIconSVG";
import { useState } from "react";

interface Props {
  values: string[];
  selectedValue: string;
  setSelectedValue: (value: string) => void;
  id?: string;
}

export function OrderSelect({
  values,
  selectedValue,
  setSelectedValue,
  id,
}: Props) {
  const [isFocused, setIsFocused] = useState(false);

  const handleBlur = () => {
    setIsFocused(false);
  };

  function handleSelect(value: string) {
    setSelectedValue(value);
    setIsFocused(false);
    handleBlur();
  }

  console.log(isFocused);

  return (
    <>
      <div
        className="SelectContainer flex justify-around items-center gap-2
      border-[1px] border-darkBlueAxion w-36 cursor-pointer bg-white
      py-2 text-sm relative transition duration-200 text-secondary-100
      "
        style={{ borderRadius: isFocused ? "10px 10px 0 0" : "10px" }}
        tabIndex={0}
        onClick={() => setIsFocused(!isFocused)}
        onBlur={handleBlur}
        id={id}
      >
        <strong className="whitespace-nowrap overflow-hidden text-start text-ellipsis">
          {selectedValue}
        </strong>
        <div
          className="icon transition duration-200"
          style={{ transform: isFocused ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          <DropDownIconSVG />
        </div>
        <div
          className="options-container absolute z-10 top-9 border-[1px] border-darkBlueAxion left-0 rounded-b-md w-full bg-white"
          style={{ display: isFocused ? "block" : "none" }}
        >
          {values.map((value) => (
            <div
              className="option py-1 px-8 cursor-pointer hover:bg-[#d5d2d2] hover:scale-[1.01]"
              onClick={() => handleSelect(value.toString())}
            >
              {value}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
