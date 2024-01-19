import { useState } from "react";
import { SelectContainer } from "./styles";
import { DropDownIconSVG } from "../../../../../public/dashboard/DropdownIconSVG";
import Select from "react-select";

interface Props {
  values: { value: string; label: string }[];
  selectedValue: string;
  setSelectedValue: (value: string) => void;
}

export function VotersInfoSelect({
  values,
  selectedValue,
  setSelectedValue,
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

  return (
    <div className="m-auto">
      <Select
        options={values}
        value={values.find((value) => value.value === selectedValue)}
        onChange={(e: any) => setSelectedValue(e.value)}
      />
    </div>
  );
}
