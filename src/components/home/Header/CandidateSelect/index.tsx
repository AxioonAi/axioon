import { useState } from "react";
import { SelectContainer } from "./styles";
import { DropDownIconSVG } from "../../../../../public/dashboard/DropdownIconSVG";
import { ProfileSelector } from "@/components/Global/CitySelector";
import { Spinner } from "react-bootstrap";

interface Props {
  profiles: string[];
  selectedProfile: {
    name: string;
    politicalGroup: string;
  };
  setSelectedProfile: any;
  id?: string;
}

export function HeaderCandidateSelect({
  profiles,
  selectedProfile,
  setSelectedProfile,
  id,
}: Props) {
  return (
    <>
      {/* <SelectContainer
        tabIndex={0}
        onClick={() => setIsFocused(!isFocused)}
        onBlur={handleBlur}
        isOpen={isFocused}
        id={id}
      >

        {selectedValue ? (
          <strong style={{ color: "white", letterSpacing: 2 }}>
            {selectedValue.name} - {selectedValue.politicalGroup}
          </strong>
        ) : (
          <></>
        )}
        <div className="icon">
          <DropDownIconSVG color="white" />
        </div>
        <div className="options-container">
          {values.map((value) => (
            <div
              className="option"
              onClick={() => handleSelect(value.toString())}
              style={{
                backgroundColor:
                  value === selectedValue ? "#FC792F" : "transparent",
              }}
            >
              {value.name} - {value.politicalGroup}
            </div>
          ))}
        </div>
      </SelectContainer> */}
      {profiles ? (
        <ProfileSelector
          selectedProfile={selectedProfile}
          setSelectedProfile={setSelectedProfile}
          profiles={profiles}
        />
      ) : (
        <></>
      )}
    </>
  );
}
