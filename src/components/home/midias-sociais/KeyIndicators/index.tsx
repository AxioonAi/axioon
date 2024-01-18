import { Spinner } from "react-bootstrap";
import { KeyIndicator } from "../KeyIndicator";
import { KeyIndicatorContent, KeyIndicatorsContainer } from "./styles";

interface Props {
  pageData: any;
}

export function KeyIndicators({ pageData }: Props) {
  return (
    <div className="Container flex flex-col justify-around w-full h-full pt-12">
      {!pageData ? (
        <Spinner animation="border" />
      ) : (
        pageData &&
        pageData.keyIndicators.map((item: any) => (
          <>
            <div>
              <div className="flex flex-col sm:flex-row w-full items-center justify-between p-4">
                <strong style={{ fontWeight: 400, fontSize: "1.1rem" }}>
                  {item.name}
                </strong>
                <KeyIndicator
                  previousValue={
                    item.previous && Number(item.previous.toFixed(0))
                  }
                  currentValue={item.current && Number(item.current.toFixed(0))}
                />
              </div>
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
    </div>
  );
}
