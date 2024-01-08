import { authGetAPI, loginVerifyAPI } from "@/lib/axios";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  async function getPoliticians() {
    const connect = await authGetAPI("/profile/monitoring");
    if (connect.body.profile.length === 0) {
      return router.push("/register-candidate");
    }
    return router.push("/home/seu-eleitorado");
  }

  async function handleVerify() {
    const connect = await loginVerifyAPI();
    if (connect !== 200) {
      return router.push("/login");
    }
    return await getPoliticians();
  }

  useEffect(() => {
    handleVerify();
  }, []);

  return;
}
