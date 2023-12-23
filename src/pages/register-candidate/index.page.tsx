import { Footer } from "@/components/register-account/Footer";
import { RegisterAccountHeader } from "@/components/register-account/Header";
import { useState } from "react";
import {
  Container,
  Main
} from "./styles";

export default function RegisterCandidate() {
  const [selectedMethod, setSelectedMethod] = useState("");

  const handleRadioChange = (event: { target: { value: string } }) => {
    setSelectedMethod(event.target.value);
  };
  return (
    <Container>
      <RegisterAccountHeader />
      <Main>
        
      </Main>
      <Footer />
    </Container>
  );
}
