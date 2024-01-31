import { useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";

interface TableProps {
  subUserData: [
    {
      name: string;
      email: string;
      active: boolean;
      id: string;
    },
  ];
  handleSubUser: (id: string, active: boolean) => void;
}

export function UsersTable({ subUserData, handleSubUser }: TableProps) {
  const [loading, setLoading] = useState(false);

  const handleClick = (id: string, active: boolean) => {
    setLoading(true);
    handleSubUser(id, active);
    setLoading(false);
  };
  return (
    <div className="TableContainer overflow-auto rounded-lg border-2 border-secondary-60 mt-4">
      <div className="TableContent flex flex-col overflow-hidden mt-2 w-full">
        <Row className="TableHeader py-2">
          <Col
            xs="4"
            className="TableCol flex items-center justify-center text-center text-xs lg:text-base"
          >
            Nome
          </Col>
          <Col
            xs="4"
            className="TableCol flex items-center justify-center text-center text-xs lg:text-base"
          >
            Email
          </Col>

          <Col
            xs="4"
            className="TableCol flex items-center justify-center text-center text-xs lg:text-base"
          >
            Status
          </Col>
        </Row>
        <div className="TableContainer rounded-lg">
          {subUserData &&
            subUserData.map((item) => (
              <>
                <Row className="TableHeader py-1">
                  <Col className="TableCol flex items-center justify-center text-center text-xs lg:text-base">
                    <span>{item.name}</span>
                  </Col>
                  <Col className="TableCol flex items-center justify-center text-center text-xs lg:text-base">
                    <span>{item.email}</span>
                  </Col>
                  <Col
                    className="TableCol flex items-center justify-center text-center text-xs lg:text-base text-brand_blue cursor-pointer"
                    onClick={() => handleClick(item.id, item.active)}
                  >
                    {loading ? (
                      <Spinner animation="border" size="sm" />
                    ) : item.active ? (
                      "Ativo"
                    ) : (
                      "Inativo"
                    )}
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
