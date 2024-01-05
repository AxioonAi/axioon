import { loginVerifyAPI } from "@/lib/axios";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  async function handleVerify() {
    const connect = await loginVerifyAPI();
    console.log("connectVerify: ", connect);
    if (connect !== 200) {
      return router.push("/login");
    }
    return router.push("/home/seu-eleitorado");
  }

  useEffect(() => {
    handleVerify();
  }, []);

  return;
}
