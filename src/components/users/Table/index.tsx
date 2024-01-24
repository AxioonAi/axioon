import Theme from "@/styles/themes";
import {
  TableCol,
  TableContainer,
  TableContent,
  TableHeader,
  TableRow,
  TableRows,
} from "./styles";
import { Col, Row } from "react-bootstrap";

export function UsersTable() {
  const data = [1, 2, 3, 4];

  return (
    <div className="TableContainer overflow-auto rounded-lg border-2 border-secondary-60 mt-4">
      <div className="TableContent flex flex-col overflow-hidden mt-2 w-full">
        <Row className="TableHeader py-2">
          <Col
            xs="3"
            className="TableCol flex items-center justify-center text-center text-xs"
          >
            Usuário
          </Col>
          <Col
            xs="3"
            className="TableCol flex items-center justify-center text-center text-xs"
          >
            Permissão
          </Col>
          <Col
            xs="3"
            className="TableCol flex items-center justify-center text-center text-xs"
          >
            Última atividade
          </Col>
          <Col
            xs="3"
            className="TableCol flex items-center justify-center text-center text-xs"
          >
            Ações
          </Col>
        </Row>
        <div className="TableContainer overflow-auto rounded-lg">
          {data.map((item) => (
            <>
              <Row className="TableHeader py-1">
                <Col className="TableCol flex items-center justify-center text-center text-xs">
                  <img
                    src="/sidebar/user.png"
                    alt=""
                    className="w-8 h-8 mr-0.5"
                  />
                  <span>robert@axion.com.br</span>
                </Col>
                <Col className="TableCol flex items-center justify-center text-center text-xs">
                  Admin
                </Col>
                <Col className="TableCol flex items-center justify-center text-center text-xs">
                  Há 2 minutos
                </Col>
                <Col className="TableCol flex items-center justify-center text-center text-xs text-brand_blue cursor-pointer">
                  Editar
                </Col>
              </Row>
              <hr />
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
