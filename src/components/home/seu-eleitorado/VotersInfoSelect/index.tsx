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
