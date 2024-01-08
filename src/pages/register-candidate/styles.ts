import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  min-height: 100vh;
  max-height: 100vh;
  overflow: auto;
`;

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  max-width: 1200px;
  margin: auto;
`;

export const Instructions = styled.div`
  padding: 2rem 0 4rem;
  display: grid;
  margin: auto;
  grid-template-columns: 37rem 33rem;

  .step2 {
    align-self: flex-end;
  }

  .step4 {
    align-self: flex-end;
  }

  @media (max-width: 1150px) {
    grid-template-columns: 33rem 29rem;
  }

  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 2rem 5%;

    img {
      width: 5rem;
    }
  }
`;

export const InstructionSection1 = styled.div`
  display: flex;
  flex-direction: column-reverse;
  gap: 1.5rem;

  @media (max-width: 1024px) {
    padding: 0;
    flex-direction: row;
    margin-bottom: 1rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;

    .step1 {
      align-self: flex-start;
    }
  }
`;

export const InstructionSection2 = styled(InstructionSection1)`
  justify-content: space-between;
  margin-left: -6rem;

  @media (max-width: 1150px) {
    margin-left: -8rem;
  }

  @media (max-width: 1024px) {
    margin-left: 0;
  }
`;

export const InstructionStep = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;

  .description {
    width: 211px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  p {
    margin: 0;
    color: #fff;
    font-weight: 500;
  }

  @media (max-width: 768px) {
    .description {
      width: 190px;
    }
  }
`;

export const StepName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  line-height: 23px;
  font-size: 1.25rem;
  font-weight: 600;
  background-color: #fff;
  border-radius: 30px;
  width: 211px;
  height: 50px;

  @media (max-width: 768px) {
    font-size: 1.125rem;
    width: 190px;
  }
`;

export const FormContainer = styled.div`
  padding: 0;

  @media (max-width: 1240px) {
    padding: 0 1rem;
  }
`;
