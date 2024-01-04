import {
  CardBottomInfo,
  CardContainer,
  Container,
  Content,
  LocationCard,
  VerticalBar,
} from "./styles";

interface Props {
  cityData: any;
}

export function SeuEleitoradoCards({ cityData }: Props) {
  return (
    <Container>
      <CardContainer>
        <VerticalBar barColor="#4A4A4A" />
        <Content>
          <p>Cidade:</p>
          <CardBottomInfo>
            <strong style={{ fontSize: "1.375rem" }}>
              {cityData?.name} - {cityData?.state}
            </strong>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                lineHeight: "1.2",
              }}
            >
              <strong
                style={{
                  fontSize: "1.125rem",
                }}
              >
                {cityData?.population.total.toLocaleString("pt-BR")}
              </strong>
              <span style={{ fontSize: "0.75rem" }}>Habitantes</span>
            </div>
          </CardBottomInfo>
        </Content>
      </CardContainer>

      <CardContainer>
        <VerticalBar barColor="#7A2EB7" />
        <Content>
          <p>Verba Disponível:</p>
          <CardBottomInfo>
            <strong style={{ fontSize: "1.625rem" }}>196.000 Mil</strong>
          </CardBottomInfo>
        </Content>
      </CardContainer>
      <CardContainer>
        <VerticalBar barColor="#4553D3" />
        <Content>
          <p>Eleitores no Município:</p>
          <CardBottomInfo>
            <strong style={{ fontSize: "1.625rem" }}>
              {cityData?.electorate.total.toLocaleString("pt-BR")}
            </strong>
          </CardBottomInfo>
        </Content>
      </CardContainer>
      <CardContainer>
        <VerticalBar barColor="#D38945" />
        <Content>
          <p>Concorrentes:</p>
          <CardBottomInfo>
            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                alignItems: "flex-end",
                marginTop: "0.3rem",
              }}
            >
              <strong style={{ fontSize: "2rem", lineHeight: "1.2" }}>
                {cityData?.politician}
              </strong>
              <span style={{ fontSize: "1.125rem", fontWeight: "600" }}>
                Prefeitos
              </span>
            </div>
          </CardBottomInfo>
        </Content>
      </CardContainer>
    </Container>
  );
}
