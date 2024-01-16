import styled from "styled-components";

export const HeaderContainer = styled.header`
  position: relative;
`;

export const HeaderTop = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;

export const Instruction = styled.div`
  background-color: white;
  padding: 1rem 0.75rem;
  border-radius: 48px;
  border: 1px solid #c3c3c3;
  font-weight: bold;
  font-size: 1.1rem;
  margin-left: auto;
  display: flex;
  gap: 5px;
`;

export const UserMenu = styled.div`
  position: absolute;
  right: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  background-color: #232323;
  border-radius: 20px;

  strong {
    color: white;
    font-size: 0.75rem;
  }

  span {
    color: #5c5c5c;
    font-size: 0.5rem;
  }

  img.user {
    width: 2.625rem;
    height: 2.625rem;
    object-fit: cover;
  }

  .arrow {
    width: 0.75rem;
    height: 0.75rem;
    margin-left: 0.3rem;
  }
`;

export const HeaderMenu = styled.nav`
  display: flex;
  justify-content: space-between;
  margin-top: 2.4rem;
  gap: 1rem;

  @media (max-width: 1400px) {
    justify-content: space-around;
    flex-wrap: wrap;
  }
`;

export const Candidate = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 3rem;
  height: 7rem;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    align-items: center;
  }
`;

export const ButtonAndSelect = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1rem;

  @media (max-width: 768px) {
    align-items: center;
    margin-top: 1rem;
  }
`;

export const CandidateInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;

  img {
    width: 4.5rem;
    height: 4.5rem;
    border-radius: 50%;
    object-fit: cover;
  }

  .info {
    display: flex;
    flex-direction: column;
  }

  strong {
    color: #292d32;
    /* font-size: 1.625rem; */
    font-weight: 600;
    line-height: 1.25;
  }

  .candidateNumber {
    color: #8790ab;
    font-size: 0.75rem;
  }

  .status {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    color: #22c24f;
    font-size: 0.5625rem;
  }

  .statusCircle {
    width: 0.3125rem;
    height: 0.3125rem;
    background-color: #22c24f;
    border-radius: 50%;
  }
`;

export const Options = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

export const Register = styled.button`
  background-color: #282c49;
  border-radius: 5px;
  width: 10rem;
  height: 2.375rem;
  color: white;
  font-size: 1.5rem;
  border: 0;
  transition: 0.2s ease-in;

  &:hover {
    background-color: #474b7a;
  }
`;

export const VerifyPopularity = styled.button`
  display: flex;
  align-items: center;
  gap: 1rem;
  text-align: left;
  width: 15.5rem;
  height: 2.9rem;
  line-height: 1;
  font-weight: bold;
  color: #292d32;
  font-size: 1.01638rem;
  font-style: normal;
  font-weight: 700;
  line-height: 1.01638rem;
  border-radius: 16px;
  border: 1px solid #0d123c;

  img {
    margin-left: 1.2rem;
  }
`;

export const VerifyCompetition = styled(VerifyPopularity)`
  background-color: #0d123c;
  color: white;
`;
