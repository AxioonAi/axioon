import px2vw from "@/utils/size";
import { Dropdown, Spinner } from "react-bootstrap";

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
              320,
            )}] md:text-[${px2vw(12, 768)}] lg:text-[${px2vw(12, 1024)}]
            border-0
          `}
            style={{
              color: "#fff",
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
          <Dropdown.Menu className="bg-darkBlueAxion">
            {timeValues.map((item: any) => (
              <Dropdown.Item
                className="text-center text-white p-3 hover:bg-hoverDarkBlueAxion"
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
