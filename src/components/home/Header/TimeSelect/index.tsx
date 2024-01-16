// import { useState } from "react";
// import { SelectContainer } from "./styles";
// import { DropDownIconSVG } from "../../../../../public/dashboard/DropdownIconSVG";

// interface Props {
//   values: string[];
//   selectedValue: string;
//   setSelectedValue: (value: string) => void;
//   id?: string;
// }

// export function HeaderTimeSelect({
//   values,
//   selectedValue,
//   setSelectedValue,
//   id,
// }: Props) {
//   const [isFocused, setIsFocused] = useState(false);

//   const handleBlur = () => {
//     setIsFocused(false);
//   };

//   function handleSelect(value: string) {
//     setSelectedValue(value);
//     setIsFocused(false);
//     handleBlur();
//   }

//   return (
//     <>
//       <SelectContainer
//         tabIndex={0}
//         onClick={() => setIsFocused(!isFocused)}
//         onBlur={handleBlur}
//         isOpen={isFocused}
//         id={id}
//       >
//         <strong>{selectedValue}</strong>
//         <div className="icon">
//           <DropDownIconSVG />
//         </div>
//         <div className="options-container">
//           {values.map((value) => (
//             <div
//               className="option"
//               onClick={() => handleSelect(value.toString())}
//             >
//               {value}
//             </div>
//           ))}
//         </div>
//       </SelectContainer>
//     </>
//   );
// }
import Theme from "@/styles/themes";
import { useState, useEffect } from "react";
import { getAPI } from "@/lib/axios";
import { Dropdown, Spinner } from "react-bootstrap";
import px2vw from "@/utils/size";
interface ProfileProps {
  timeValues: any;
  selectedTimeValues: any;
  setSelectedTimeValues?: any;
  getIndividualDetails: any;
  loading?: boolean;
  setLoading?: any;
}

export function HeaderTimeSelect({
  timeValues,
  selectedTimeValues,
  setSelectedTimeValues,
  getIndividualDetails,
  loading,
  setLoading,
}: ProfileProps) {
  const Remember = (item: any) => {
    setLoading(true);
    setSelectedTimeValues(item);
    localStorage.setItem("selectedTime", item.value);
    localStorage.setItem("selectedTimeName", item.name);
  };
  return (
    <>
      <div className="flex">
        <Dropdown className="flex items-center justify-center">
          <Dropdown.Toggle
            className={`flex items-center justify-center text-[${px2vw(
              12,
              320
            )}] md:text-[${px2vw(12, 768)}] lg:text-[${px2vw(12, 1024)}]
          text-darkBlueAxion bg-gray-10 border-0
          `}
            style={{
              color: `${Theme.color.gray_10}`,
              backgroundColor: "#0d123c",
              border: 0,
            }}
          >
            {timeValues ? (
              `${selectedTimeValues.name}`
            ) : (
              <>
                <Spinner animation="border" />
              </>
            )}
          </Dropdown.Toggle>
          <Dropdown.Menu className="bg-darkBlueAxion border border-secondary-100">
            {timeValues.map((item: any) => (
              <Dropdown.Item
                className="text-center text-gray-10 border border-gray-10 p-3 hover:text-darkBlueAxion last:border-0"
                onClick={() => Remember(item)}
                key={item}
              >
                {item.name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </>
  );
}
