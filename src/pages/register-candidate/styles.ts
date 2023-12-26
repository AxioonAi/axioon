import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  padding-bottom: 4rem;
  min-height: 100vh;
  background: linear-gradient(117deg, #0d123c 0%, #34374c 100%);

  @media (max-width: 768px) {
    padding-bottom: 8rem;
  }
`;

export const Main = styled.main`
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  margin: auto;

  @media (max-width: 1180px) {
  }
`;

export const Instructions = styled.div`
  display: grid;
  grid-template-columns: 90% 90%;
  grid-template-areas:
    'step2 step4'
    'step1 step3';


  .step1 {
    grid-area: step1;
  }
  .step2 {
    grid-area: step2;
    justify-self: end;

  }
  .step3 {
    grid-area: step3;
  }
  .step4 {
    grid-area: step4;
    justify-self: end;

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
`;

export const StepName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.25rem;
  font-weight: 600;
  background-color: #fff;
  border-radius: 30px;
  width: 211px;
  height: 50px;
`;
