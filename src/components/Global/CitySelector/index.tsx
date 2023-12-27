import Theme from "@/styles/themes";
import { Button, Container, Item, ItemText, Menu, Toggle } from "./styles";
import { useState, useEffect } from "react";
import { getAPI } from "@/lib/axios";
import { Spinner } from "react-bootstrap";
interface ProfileProps {
  selectedProfile: {
    name: string;
    politicalGroup: string;
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
  return (
    <>
      <Container {...rest}>
        <Button>
          <Toggle
            style={{
              color: `${Theme.color.gray_10}`,
              backgroundColor: "#0d123c",
              border: 0,
            }}
          >
            {selectedProfile ? (
              `${selectedProfile.name} - ${selectedProfile.politicalGroup}`
            ) : (
              <>
                <Spinner animation="border" />
              </>
            )}
          </Toggle>
          <Menu>
            {profiles.map((item: any) => (
              <Item onClick={() => setSelectedProfile(item)} key={item}>
                {item.name} - {item.politicalGroup}
              </Item>
            ))}
          </Menu>
        </Button>
      </Container>
    </>
  );
}
