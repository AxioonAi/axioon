import { Wrapper } from "@googlemaps/react-wrapper";
import React from "react";

export const GoogleMapsWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const apiKey = "AIzaSyAIAT0b9t-mNqiRudrgvUniUbug890kyNg";

  if (!apiKey) {
    return <div>Cannot display the map: google maps api key missing</div>;
  }

  return <Wrapper apiKey={apiKey}>{children}</Wrapper>;
};
