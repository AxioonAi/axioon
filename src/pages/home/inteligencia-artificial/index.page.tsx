import { useChatFunctions } from "../../api/ia.api";
import RootLayout from "@/components/Layout";
import { HeaderComponent } from "@/components/home/Header";
import { PrompSuggestion } from "@/components/home/inteligencia-artificial/PromptSuggestion";
import { authGetAPI } from "@/lib/axios";
import axios from "axios";
import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function InteligenciaArtificial() {
  const main = useRef(null);
  const content = useRef(null);
  const {
    messages,
    setMessages,
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
  const [chatLog, setChatLog] = useState<any>([]);

  useEffect(() => {
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

  const [locked, setLocked] = useState(true);

  async function getPlan() {
    const connect = await authGetAPI("/user/signature/ai");
    if (connect.status !== 200) {
      return setLocked(true);
    }
    setLocked(false);
  }

  useEffect(() => {
    getPlan();
    setTimeout(() => {
      const chatInput = document.getElementById("chatInput");
      if (chatInput) {
        chatInput.scrollIntoView({ behavior: "smooth" });
      }
    }, 1500);
  }, []);

  const [firstMessage, setFirstMessage] = useState(true);
  function handleSuggestionClick(tipContent: string) {
    setFirstMessage(false);
    setMessagesForSuggestion(tipContent);
  }

  useEffect(() => {
    const textarea = document.getElementById(
      "chatInput",
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

  function KeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      if (firstMessage) {
        handleSuggestionClick("StartMessages");
        setChatLog((prevChatLog: any) => [
          ...prevChatLog,
          { type: "user", message: userMessage },
        ]);

        sendMessage(userMessage);
        event.preventDefault();
        setUserMessage("");
      } else {
        event.preventDefault();
        setChatLog((prevChatLog: any) => [
          ...prevChatLog,
          { type: "user", message: userMessage },
        ]);
        sendMessage(userMessage);
        setUserMessage("");
      }
    }
  }

  const sendMessage = (message: any) => {
    const url = "/api/test";
    const data = {
      model: "gpt-3.5-turbo-1106",
      messages: [...messages, { role: "user", content: message }],
    };
    if (firstMessage) {
      setMessagesForSuggestion("StartMessages");
    }

    axios
      .post(url, data)
      .then((response) => {
        setChatLog((prevChatLog: any) => [
          ...prevChatLog,
          {
            type: "assistant",
            message: response.data.choices[0].message.content,
          },
        ]);
      })
      .catch((error) => {
        // setIsLoading(false);
        console.log(error);
      });
  };

  const [showTip, setShowTip] = useState(false);
  function Reload() {
    setChatLog([]);
    setShowTip(false);
    setFirstMessage(true);
    setMessagesForSuggestion("StartMessages");
  }

  const [selectedProfile, setSelectedProfile] = useState({
    name: "Carregando...",
    politicalGroup: "",
    id: "",
    image: "",
    campaignNumber: 0,
  });

  return (
    <main ref={main}>
      <RootLayout fadeOut={() => fadeOut()}>
        <div
          className="mainContent bg-gray-10 rounded-tl-2xl rounded-bl-2xl
p-4 my-2 w-full lg:w-[calc(100%-18rem)] relative left-full
lg:left-[calc(100%-17.5rem)]"
          ref={content}
        >
          <HeaderComponent
            selectedProfile={selectedProfile}
            setSelectedProfile={setSelectedProfile}
            fadeOut={() => fadeOut()}
          />
          <div
            className={`${
              locked ? "hidden" : "flex"
            } h-[95vh] bg-white mt-8 rounded-[50px] p-[2rem_0_1rem] transition-all duration-300 ease-in lg:rounded-[15px]`}
          >
            <div className="h-full w-full flex flex-col items-center justify-between mx-auto">
              <div className="ChatHeader flex items-start gap-4 sm: scale-90">
                <Image
                  width={343}
                  height={67}
                  src={"/axionLogo.png"}
                  alt=""
                  className="sm:w-[12rem] h-auto"
                />
                <div className="bg-gradient-to-r from-[#d8d8d8] to-[#0d123c] rounded-lg w-12 h-7 flex justify-center items-center lg:w-8 lg:h-auto lg:p-1">
                  <Image width={32} height={20} src={"/ia.png"} alt="" />
                </div>
              </div>
              {!firstMessage ? (
                <div
                  style={{
                    alignSelf: "flex-end",
                    position: "relative",
                    marginRight: "1rem",
                  }}
                >
                  <div
                    className={`absolute p-[0.3rem] right-[-0.5rem] top-[-4.5rem] border border-black rounded-[10px] text-justify text-[#1f1f1f] bg-white ${
                      showTip ? "z-[100]" : "z-[-1]"
                    } ${!showTip ? "opacity-0" : "opacity-1"} transition duration-300 ease-in`}
                  >
                    Reiniciar Conversa
                    <div className="absolute bg-white w-[0.7rem] h-[0.7rem] right-[1rem] rotate-45 border-r border-b border-black" />
                  </div>
                  <button
                    onMouseEnter={() => setShowTip(true)}
                    onMouseLeave={() => setShowTip(false)}
                    onClick={() => Reload()}
                    className="w-8 h-8 animate-fadeInWelcomeMessage self-end bg-transparent border-none hover:scale-105"
                  >
                    <img src="/refreshIco.svg" className="w-full h-full" />
                  </button>
                </div>
              ) : (
                <></>
              )}
              {firstMessage ? (
                <>
                  <div className="flex animate-fadeInWelcomeMessage flex-col items-center justify-between mx-auto text-2xl text-[#0d123c] text-center md:text-xl">
                    Como posso te Ajudar Hoje?
                  </div>
                </>
              ) : (
                <div className="flex flex-col p-2 gap-4 w-full h-[60vh] overflow-y-auto mt-4 pb-2 mb-2">
                  {chatLog
                    // .filter(
                    //   (item: any, index: any) => index >= firstMessageCount,
                    // ) // Filtrar mensagens com role diferente de "system"
                    .map((item: any, index: any) => (
                      <>
                        {item.type === "assistant" ? (
                          <>
                            <div className=" rounded-[0_15px_15px_15px] text-white bg-darkBlueAxion text-sm font-bold  text-justify p-[1rem_0.5rem] mr-4 lg:text-base">
                              {item.message}
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex h-max p-2 rounded-[15px_0_15px_15px] text-darkBlueAxion bg-white border-2 border-darkBlueAxion">
                              {/* <div className="bg-white border-[1px] border-darkBlueAxion p-2 rounded-[15px_0_15px_15px]"> */}
                              {item.message}
                            </div>
                          </>
                        )}
                      </>
                    ))}
                </div>
              )}

              <div className="w-full flex flex-col items-center gap-[2.75rem]">
                {firstMessage ? (
                  <div className="flex w-1/2 gap-1 animate-fadeInWelcomeMessage flex-wrap items-center justify-center">
                    <PrompSuggestion
                      content="Insights de Marketing"
                      imgSrc="/dashboard/inteligencia-artificial/marketingInsights.svg"
                      tipContent="Insights de marketing"
                      onClick={() =>
                        handleSuggestionClick("Insights de Marketing")
                      }
                    />
                    <PrompSuggestion
                      content="Idéias de Campanhas"
                      imgSrc="/dashboard/inteligencia-artificial/campaignIdeas.svg"
                      tipContent="Insights de marketing"
                      onClick={() =>
                        handleSuggestionClick("Idéias de Campanhas")
                      }
                    />

                    <PrompSuggestion
                      content="IA Financeira"
                      imgSrc="/dashboard/inteligencia-artificial/financialIa.svg"
                      tipContent="Insights de marketing"
                      onClick={() => handleSuggestionClick("IA Financeira")}
                    />
                  </div>
                ) : (
                  <></>
                )}
                <div className="w-full flex items-end justify-center gap-4 px-4">
                  <textarea
                    id="chatInput"
                    placeholder="Fale com nossa IA..."
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    onKeyDown={KeyDown}
                    className="resize-none w-full max-w-[57rem] p-3 h-10 text-lg border-2 border-[#0d123c] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d123c] md:text-base"
                  />
                  <button
                    disabled={!userMessage}
                    onClick={sendMessage}
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
