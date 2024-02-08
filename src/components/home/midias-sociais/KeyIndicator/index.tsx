interface Props {
  previousValue: number;
  currentValue: number;
}

export function KeyIndicator({ previousValue, currentValue }: Props) {
  const total = previousValue + currentValue;
  const currentValuePercentage = (currentValue * 100) / total;
  const previousValuePercentage = (previousValue * 100) / total;

  function formatNumber(number: number) {
    if (number > 1000) {
      return `${(number / 1000).toFixed(1)}K`;
    } else {
      return number;
    }
  }

  return (
    <div className="Container flex text-sm items-center gap-2">
      <span>{formatNumber(previousValue)}</span>
      <div className="Bar flex items-center h-3 w-36">
        <div
          className="previousValueBar relative h-full bg-gradient-to-l from-[#323452] to-[#323452)] rounded-l-full"
          style={{ width: `${previousValuePercentage}%` }}
        >
          <div className="Marker absolute right-0 -bottom-1 w-1 h-5 bg-[#3c3c3c] rounded" />
        </div>
        <div
          className="currentValueBar relative h-full bg-[#323452] opacity-40 rounded-r-full"
          style={{ width: `${currentValuePercentage}%` }}
        />
      </div>
      <span style={{ width: "3.5rem" }}>{formatNumber(currentValue)}</span>
    </div>
  );
}
