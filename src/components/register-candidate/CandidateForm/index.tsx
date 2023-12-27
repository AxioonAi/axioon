import { ClickHere, Container, FinishButton, FormGroup } from "./styles";

export function CandidateForm() {
  return (
    <Container>
      <FormGroup>
        <label htmlFor="socialName">Nome Social</label>
        <input
          type="text"
          name="socialName"
          id="socialName"
          placeholder="Digite"
        />
      </FormGroup>
      <FormGroup>
        <label htmlFor="fullName">Nome completo</label>
        <input type="text" name="fullName" id="fullName" placeholder="Digite" />
      </FormGroup>
      <FormGroup>
        <label htmlFor="city">Cidade</label>
        <div className="select-container">
          <img
            src="/register-candidate/arrow-down.svg"
            alt=""
            className="icon"
          />
          <select name="city" id="city">
            <option value="" selected disabled>
              Selecione
            </option>
            <option value="">Cidade 1</option>
            <option value="">Cidade 2</option>
            <option value="">Cidade 3</option>
          </select>
        </div>
      </FormGroup>
      <FormGroup>
        <label htmlFor="state">Estado</label>
        <div className="select-container">
          <img
            src="/register-candidate/arrow-down.svg"
            alt=""
            className="icon"
          />
          <select name="state" id="state">
            <option value="" selected disabled>
              Selecione
            </option>
            <option value="">Estado 1</option>
            <option value="">Estado 2</option>
            <option value="">Estado 3</option>
          </select>
        </div>
      </FormGroup>
      <FormGroup>
        <label htmlFor="role">Cargo</label>
        <div className="select-container">
          <img
            src="/register-candidate/arrow-down.svg"
            alt=""
            className="icon"
          />
          <select name="role" id="role">
            <option value="" selected disabled>
              Selecione
            </option>
            <option value="">Cargo 1</option>
            <option value="">Cargo 2</option>
            <option value="">Cargo 3</option>
          </select>
        </div>
      </FormGroup>
      <FormGroup>
        <label htmlFor="politicalParty">Partido político</label>
        <div className="select-container">
          <img
            src="/register-candidate/arrow-down.svg"
            alt=""
            className="icon"
          />
          <select name="politicalParty" id="politicalParty">
            <option value="" selected disabled>
              Selecione
            </option>
            <option value="">Partido político 1</option>
            <option value="">Partido político 2</option>
            <option value="">Partido político 3</option>
          </select>
        </div>
      </FormGroup>
      <FormGroup>
        <label htmlFor="socialMidias">Redes Sociais</label>
        <ClickHere>
          <strong>Clique aqui</strong>
          <img src="/register-candidate/hand-icon.svg" alt="" />
        </ClickHere>
      </FormGroup>

      <FinishButton>Inseriu? Concluir</FinishButton>
    </Container>
  );
}
