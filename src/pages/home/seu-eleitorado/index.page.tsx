import { Sidebar } from "@/components/Global/Sidebar";
import { Container, Content, Main } from "./styles";
import { useRouter } from "next/router";
import { HeaderComponent } from "@/components/home/Header";

export default function SeuEleitorado() {
  const router = useRouter();
  return (
    <Container>
      <Sidebar />
      <Content>
        <HeaderComponent />
        <Main>
          <h1>osdajsaddsadsadsadassdadassdadas</h1>
          <button onClick={() => alert(router.asPath.split("/")[1])}>
            dslalds
          </button>
        </Main>
      </Content>
    </Container>
  );
}
