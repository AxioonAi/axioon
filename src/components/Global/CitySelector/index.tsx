import { Dropdown, Spinner } from "react-bootstrap";

interface ProfileProps {
  selectedProfile: {
    name: string;
    politicalGroup: string;
    id: string;
  };
  setSelectedProfile?: any;
  profiles?: any;
}

export function ProfileSelector({
  selectedProfile,
  setSelectedProfile,
  profiles,
  ...rest
}: ProfileProps) {
  const Remember = (item: any) => {
    setSelectedProfile(item);
    localStorage.setItem("selectedProfile", item.id);
  };
  return (
    <>
      <div className="Container flex" {...rest}>
        <Dropdown className="flex items-center justify-center">
          <Dropdown.Toggle
            className="flex items-center justify-center text-sm text-white border-0"
            style={{ backgroundColor: "#0d123c" }}
          >
            {selectedProfile ? (
              `${selectedProfile.name} - ${selectedProfile.politicalGroup}`
            ) : (
              <>
                <Spinner animation="border" />
              </>
            )}
          </Dropdown.Toggle>
          <Dropdown.Menu className="bg-darkBlueAxion border border-secondary-100 opacity-95 px-1">
            {profiles.map((item: any) => (
              <Dropdown.Item
                className="text-center text-white border-b-[1px] border-gray-10 p-2 hover:text-darkBlueAxion last:border-0"
                onClick={() => Remember(item)}
                key={item}
              >
                {item.name} - {item.politicalGroup}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </>
  );
}
