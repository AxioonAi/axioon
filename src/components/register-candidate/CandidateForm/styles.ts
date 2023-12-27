import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: space-around;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    color: white;
    font-weight: 600;
    font-size: 0.875rem;
  }

  .select-container,
  input {
    width: 220px;
    height: 53px;
    border-radius: 5px;
    font-size: 0.875rem;
    color: #0d123c;
  }

  input {
    padding: 0 12px;
  }

  .select-container {
    position: relative;

    .icon {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
    }

    select {
      appearance: none;
      border: none;
      outline: none;
      border-radius: 5px;
      width: 100%;
      height: 100%;
      padding: 0 12px;
    }
  }

  @media (max-width: 768px) {
    width: 90%;
    margin: auto;

    .select-container,
    input {
      margin: auto;
      width: 100%;
    }
  }
`;

export const ClickHere = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 0 12px;
  cursor: pointer;
  font-size: 0.875rem;
  width: 220px;
  height: 53px;
  border-radius: 5px;

  @media (max-width: 768px) {
    width: 100%;
    /* margin: auto; */
  }
`;

export const FinishButton = styled.button`
  width: 220px;
  height: 53px;
  border: 1px solid white;
  border-radius: 5px;
  background-color: #0d123c;
  font-size: 0.875rem;
  color: white;
  align-self: flex-end;
  transition: 0.2s;

  &:hover {
    background-color: #141c5e;
  }

  @media (max-width: 768px) {
    margin: auto;
  }
`;
