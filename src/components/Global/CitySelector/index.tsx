import Theme from "@/styles/themes";
import { Button, Container, Item, ItemText, Menu, Toggle } from "./styles";
import { useState, useEffect } from "react";
import { getAPI } from "@/lib/axios";
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
              <Item onClick={() => Remember(item)} key={item}>
                {item.name} - {item.politicalGroup}
              </Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </>
  );
}
