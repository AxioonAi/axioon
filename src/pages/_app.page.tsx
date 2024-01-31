import "../styles/bootstrap.scss";
import "@/components/Global/Animations/Spinner/animation.css";
import "@/styles/globals.css";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: any) {
  useEffect(() => {
    //@ts-ignore
    import("bootstrap/dist/js/bootstrap");
  }, []);

  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
