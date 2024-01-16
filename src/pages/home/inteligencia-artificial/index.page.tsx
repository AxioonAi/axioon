import RootLayout from "@/components/Layout";
import { HeaderComponent } from "@/components/home/Header";
import gsap from "gsap";
import { useRouter } from "next/router";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  ChatBody,
  ChatConteiner,
  ChatContent,
  ChatFooter,
  ChatHeader,
  Content,
  IaImgContainer,
  IaMessage,
  Message,
  ReloadButton,
  SuggestionsContainer,
  TextareaAndButton,
  UserMessage,
} from "./styles";
import Image from "next/image";
import { SuggestionContainer } from "@/components/home/inteligencia-artificial/PromptSuggestion/styles";
import { PrompSuggestion } from "@/components/home/inteligencia-artificial/PromptSuggestion";
import { useChatFunctions } from "./ia";
  

export default function InteligenciaArtificial() {
  const main = useRef(null);
  const content = useRef(null);
  const {
    messages,
    userMessage,
    isLoading,
    setUserMessage,
    handleUserMessageSubmit,
    handleTypingComplete,
    firstMessageCount,
    receivedChunks,
    handleKeyDown,
    setMessagesForSuggestion,
  } = useChatFunctions();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".mainContent", {
        x: "-100%",
        opacity: 1,
        duration: 0.5,
        delay: 0.2,
      });
    }, main);
    return () => ctx.revert();
  }, []);

  const fadeOut = () => {
    const ctx = gsap.context(() => {
      gsap.to(".mainContent", {
        opacity: 0,
        duration: 0.5,
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
  const [firstMessage, setFirstMessage] = useState(true);
  function handleSuggestionClick (tipContent: string){
    setFirstMessage(false);
    setMessagesForSuggestion(tipContent);
  };

  useEffect(() => {
    const textarea = document.getElementById(
      "chatInput"
    ) as HTMLTextAreaElement;

    textarea.addEventListener("input", () => {
      textarea.style.height = "2rem";
      textarea.style.height = `${textarea.scrollHeight / 16}rem`;
      textarea.style.minHeight = "2rem";
      textarea.style.maxHeight = "12.5rem";
      console.log(textarea.style.height);
      if (Number(textarea.style.height.split("rem")[0]) > 12.5) {
        textarea.style.overflowY = "scroll";
      } else {
        textarea.style.overflowY = "hidden";
      }
    });
  }, []);

  const [textareaValue, setTextareaValue] = useState("");
  function KeyDown (event: React.KeyboardEvent<HTMLTextAreaElement>){
    if (event.key === "Enter" && !event.shiftKey) {
      if (firstMessage) {
        setFirstMessage(false);
        handleSuggestionClick("StartMessages");
        handleUserMessageSubmit();
        event.preventDefault();
      } else {
        handleUserMessageSubmit();
        event.preventDefault();
      }
    }

  }
  function SendMessage() {
    if (firstMessage) {
      setFirstMessage(false);
      handleSuggestionClick("StartMessages");
      handleUserMessageSubmit();
    } else {
      handleUserMessageSubmit();
    }
  }
  const [showTip, setShowTip] = useState(false);
  function Reload () {
    setShowTip(false)
    setFirstMessage(true);
    setMessagesForSuggestion("StartMessages");
  }
  const [selectedProfile, setSelectedProfile] = useState({
    name: "",
    politicalGroup: "",
    id: "",
  });

  return (
    <main ref={main}>
      <RootLayout fadeOut={() => fadeOut()}>
        <div className="relative bg-gray-10 m-1 sm:left-2 rounded-[25px_0_0_25px] p-3    animate-fadeIn" ref={content}>
        <HeaderComponent
            selectedProfile={selectedProfile}
            setSelectedProfile={setSelectedProfile}
            fadeOut={() => fadeOut()}
          />
          <div className="h-[95vh] bg-white rounded-[50px] p-[2rem_0_1rem] transition-all duration-300 ease-in lg:rounded-[15px]  ">
            <div className="h-full max-w-[57rem] flex flex-col items-center justify-between mx-auto">
              <div className="ChatHeader flex items-start gap-4 sm: scale-90">
                <Image width={343} height={67} src={"/axionLogo.png"} alt="" className="sm:w-[12rem] h-auto"/>
                <div className="bg-gradient-to-r from-[#d8d8d8] to-[#0d123c] rounded-lg w-12 h-7 flex justify-center items-center lg:w-8 lg:h-auto lg:p-1">
                  <Image width={32} height={20} src={"/ia.png"} alt="" />
                </div >
                
              </div >
              {!firstMessage ?(
              <div style={{alignSelf: "flex-end", position: 'relative',marginRight: "1rem"}}>
              <Message show={showTip}>
                Reiniciar Conversa
                <div className="arrow" />
              </Message>
              <button
                onMouseEnter={() => setShowTip(true)}
                onMouseLeave={() => setShowTip(false)}
                onClick={() => Reload()}
                className="w-8 h-8 animate-fadeInWelcomeMessage self-end bg-transparent border-none hover:scale-105"
              >
                <img src="/refreshIco.svg" className="w-full h-full"/>
              </button>
              </div>
              ) : <></>}
              {firstMessage ?(
                <>
              <div className="flex  animate-fadeInWelcomeMessage flex-col items-center justify-between mx-auto text-2xl text-[#0d123c] text-center md:text-xl">Como posso te Ajudar Hoje?</div>
              </>
              ) : (
          <div className="flex flex-col p-2 gap-4 w-full h-full mt-4 overflow-hidden overflow-y-auto pb-2 mb-2">
            {messages
              .filter((item: any, index: any) => index >= firstMessageCount) // Filtrar mensagens com role diferente de "system"
              .map((item: any, index: any) => (
                <>
                  {item.role === "assistant" ? (
                    <>
                      <div className=" rounded-[0_15px_15px_15px] text-white bg-darkBlueAxion text-sm font-bold  text-justify p-[1rem_0.5rem] mr-4 lg:rounded-[0_30px_30px_30px] lg:text-base">{item.content}</div>
                    </>
                  ) : (
                    <>
                      <div className=" min-h-10 p-[1rem_0.5rem] rounded-[15px_0_15px_15px] text-darkBlueAxion bg-white border-2 border-darkBlueAxion lg:rounded-[30px_0_30px_30px] lg:text-base">
                        <pre className="whitespace-pre-wrap">{item.content}</pre>
                      </div>
                    </>
                  )}
                </>
              ))}
          </div>
              )
              }

              <div className="w-full flex flex-col items-center gap-[2.75rem]">
                {firstMessage ? (
                <div className="flex flex-col w-full animate-fadeInWelcomeMessage lg:gap-2 lg:items-center sm:flex-row">
                  <div className="w-full mt-2 gap-1 ml-3 md:w-1/3 flex justify-center items-center">
                  <PrompSuggestion
                    content="Insights de Marketing"
                    imgSrc="/dashboard/inteligencia-artificial/marketingInsights.svg"
                    tipContent="Insights de marketing"
                    onClick={() => handleSuggestionClick("Insights de Marketing")}
                  />
                  </div>
                  <div className="flex justify-between gap-4 mt-2">

                  <PrompSuggestion
                    content="Idéias de Campanhas"
                    imgSrc="/dashboard/inteligencia-artificial/campaignIdeas.svg"
                    tipContent="Insights de marketing"
                    onClick={() => handleSuggestionClick("Idéias de Campanhas")}
                  />

                  <PrompSuggestion
                    content="IA Financeira"
                    imgSrc="/dashboard/inteligencia-artificial/financialIa.svg"
                    tipContent="Insights de marketing"
                    onClick={() => handleSuggestionClick("IA Financeira")}
                  />
                  </div>
                </div>
                ) : <></>}
                <div className="w-full flex items-end justify-center gap-4 px-4">
                  <textarea
                    id="chatInput"
                    placeholder="Fale com nossa IA..."
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    onKeyDown={KeyDown}
                    className="resize-none w-full max-w-[57rem] overflow-hidden p-3 h-14 text-lg border-2 border-[#0d123c] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d123c] md:text-base"
                  />
                  <button
                    disabled={!userMessage}
                    onClick={SendMessage}
                    className="border-none bg-transparent mb-2 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Image
                      width={30}
                      height={30}
                      src={
                        "/dashboard/inteligencia-artificial/sendMessageIcon.svg"
                      }
                      alt={""}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </RootLayout>
    </main>
  );
}
