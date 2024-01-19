interface Props {
  color?: string;
  isFocused?: boolean;
}

export function DropDownIconSVG({
  color = "#0D123C",
  isFocused = false,
}: Props) {
  return (
    <svg
      width="19"
      height="21"
      viewBox="0 0 19 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`transition duration-200 ${isFocused ? "rotate-180" : "rotate-0"}`}
    >
      <g id="vuesax/linear/arrow-down">
        <g id="arrow-down">
          <path
            id="Vector"
            d="M15.0829 7.83124L10.1929 13.5362C9.61538 14.21 8.67038 14.21 8.09288 13.5362L3.20288 7.83124"
            stroke={color}
            stroke-width="1.5"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
      </g>
    </svg>
  );
}
