import RootLayout from "@/components/Layout";
import { HeaderComponent } from "@/components/home/Header";
import gsap from "gsap";
import { useRouter } from "next/router";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  ChatConteiner,
  ChatContent,
  ChatFooter,
  ChatHeader,
  Content,
  IaImgContainer,
  SuggestionsContainer,
  TextareaAndButton,
} from "./styles";
import Image from "next/image";
import { SuggestionContainer } from "@/components/home/inteligencia-artificial/PromptSuggestion/styles";
import { PrompSuggestion } from "@/components/home/inteligencia-artificial/PromptSuggestion";

export default function InteligenciaArtificial() {
  const main = useRef(null);
  const content = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".mainContent", {
        x: "-100%",
        opacity: 1,
        duration: 1,
        delay: 0.2,
      });
    }, main);
    return () => ctx.revert();
  }, []);

  const fadeOut = () => {
    const ctx = gsap.context(() => {
      gsap.to(".mainContent", {
        opacity: 0,
        duration: 1,
      });
    }, main);
    return () => ctx.revert();
  };

  useEffect(() => {
    setTimeout(() => {
      const chatInput = document.getElementById("chatInput");
      if (chatInput) {
        chatInput.scrollIntoView({ behavior: "smooth" });
      }
    }, 500);
  }, []);

  useEffect(() => {
    const textarea = document.getElementById(
      "chatInput"
    ) as HTMLTextAreaElement;

    textarea.addEventListener("input", () => {
      textarea.style.height = "2rem";
      textarea.style.height = `${textarea.scrollHeight / 16}rem`;
      textarea.style.minHeight = "2rem";
      textarea.style.maxHeight = "12.5rem";
      if (Number(textarea.style.height.split("rem")[0]) > 12.5) {
        textarea.style.overflowY = "scroll";
      } else {
        textarea.style.overflowY = "hidden";
      }
    });
  }, []);

  const [textareaValue, setTextareaValue] = useState("");
  const [selectedProfile, setSelectedProfile] = useState({
    name: "",
    politicalGroup: "",
    id: "",
  });

  return (
    <main ref={main}>
      <RootLayout fadeOut={() => fadeOut()}>
        <Content className="mainContent" ref={content} style={{ opacity: 1 }}>
          <HeaderComponent
            selectedProfile={selectedProfile}
            setSelectedProfile={setSelectedProfile}
            fadeOut={() => fadeOut()}
          />
          <ChatConteiner>
            <ChatContent>
              <ChatHeader>
                <Image width={343} height={67} src={"/axionLogo.png"} alt="" />
                <IaImgContainer>
                  <Image width={32} height={20} src={"/ia.png"} alt="" />
                </IaImgContainer>
              </ChatHeader>
              <div className="welcomeMessage">Como posso te Ajudar Hoje?</div>
              <ChatFooter>
                <SuggestionsContainer>
                  <PrompSuggestion
                    content="Insights de Marketing"
                    imgSrc="/dashboard/inteligencia-artificial/marketingInsights.svg"
                    tipContent="Insights de marketing"
                  />
                  <PrompSuggestion
                    content="Idéias de Campanhas"
                    imgSrc="/dashboard/inteligencia-artificial/campaignIdeas.svg"
                    tipContent="Insights de marketing"
                  />
                  <PrompSuggestion
                    content="IA Financeira"
                    imgSrc="/dashboard/inteligencia-artificial/financialIa.svg"
                    tipContent="Insights de marketing"
                  />
                </SuggestionsContainer>
                <TextareaAndButton>
                  <textarea
                    name=""
                    id="chatInput"
                    placeholder="Fale com nossa IA..."
                    value={textareaValue}
                    onChange={(e) => setTextareaValue(e.target.value)}
                  />
                  <button disabled={!textareaValue}>
                    <Image
                      width={30}
                      height={30}
                      src={
                        "/dashboard/inteligencia-artificial/sendMessageIcon.svg"
                      }
                      alt={""}
                    />
                  </button>
                </TextareaAndButton>
              </ChatFooter>
            </ChatContent>
          </ChatConteiner>
        </Content>
      </RootLayout>
    </main>
  );
}
