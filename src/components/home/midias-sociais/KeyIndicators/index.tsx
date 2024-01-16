import { Spinner } from "react-bootstrap";
import { KeyIndicator } from "../KeyIndicator";
import { KeyIndicatorContent, KeyIndicatorsContainer } from "./styles";

interface Props {
  pageData: any;
}

export function KeyIndicators({ pageData }: Props) {
  return (
    <KeyIndicatorsContainer>
      {!pageData ? (
        <Spinner animation="border" />
      ) : (
        pageData &&
        pageData.keyIndicators.map((item: any) => (
          <>
            <div>
              <KeyIndicatorContent>
                <strong style={{ fontWeight: 400, fontSize: "1.1rem" }}>
                  {item.name}
                </strong>
                <KeyIndicator
                  previousValue={
                    item.previous && Number(item.previous.toFixed(0))
                  }
                  currentValue={item.current && Number(item.current.toFixed(0))}
                />
              </KeyIndicatorContent>
            </div>
            <div
              style={{
                width: "100%",
                borderTop: "1px solid #C8C8C8",
                margin: "0 auto",
              }}
            />
          </>
        ))
      )}
    </KeyIndicatorsContainer>
  );
}
