import {
  CampaignMessages,
  FinanceMessages,
  MarketingMessages,
  StartMessage,
} from "../home/inteligencia-artificial/iaPath";
import OpenAI from "openai";
import React, { useState } from "react";

export function useChatFunctions() {
  const [messages, setMessages] = useState<any>([]);
  const [userMessage, setUserMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [receivedChunks, setReceivedChunks] = useState<any>([]);
  const [firstMessageCount, setFirstMessageCount] = useState(0);

  async function handleApiCall(messageList: any[]): Promise<string | null> {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY, //Testes Front Axioon
      dangerouslyAllowBrowser: true,
    });
    try {
      // console.log(process.env.OPENAI_API_KEY)
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-1106",
        messages: messageList,
        stream: true,
      });
      let finalResponse = ""; // Inicialize uma string vazia para armazenar a resposta final)
      for await (const chunk of response) {
        const chunkContent = chunk.choices[0].delta.content;

        // Verifique se o chunkContent não é undefined
        const systemResponse = { role: "assistant", content: finalResponse };

        setMessages((prevMessages: any) => {
          const currentMessage = prevMessages[prevMessages.length - 1];

          if (currentMessage.role === "assistant") {
            prevMessages[prevMessages.length - 1] = systemResponse;
            return [...prevMessages];
          } else {
            return [...prevMessages, systemResponse];
          }
        });

        // Adicione o chunk ao finalResponse
        finalResponse += chunkContent;
      }
      return finalResponse;
    } catch (err) {
      console.error("Error: " + err);
      throw err;
    }
  }
  const setMessagesForSuggestion = (tipContent: string) => {
    let suggestionMessages = [];

    // Logic to set messages based on the tipContent
    if (tipContent === "Insights de Marketing") {
      suggestionMessages = MarketingMessages;
      setFirstMessageCount(suggestionMessages.length);
    } else if (tipContent === "Idéias de Campanhas") {
      suggestionMessages = CampaignMessages;
      setFirstMessageCount(suggestionMessages.length);
    } else if (tipContent === "IA Financeira") {
      suggestionMessages = FinanceMessages;
      setFirstMessageCount(suggestionMessages.length);
    } else {
      suggestionMessages = StartMessage;
      setFirstMessageCount(suggestionMessages.length);
    }

    setMessages([...suggestionMessages]);
  };
  async function handleUserMessageSubmit() {
    if (userMessage.trim() !== "") {
      setIsLoading(true);
      const userMessageObj = { role: "user", content: userMessage };
      setMessages((prevMessages: any) => [...prevMessages, userMessageObj]);
      setUserMessage("");

      try {
        const apiResponse = await handleApiCall([...messages, userMessageObj]);

        if (apiResponse !== null) {
          const systemResponse = { role: "assistant", content: apiResponse };
          setReceivedChunks(apiResponse);
          // setMessages((prevMessages: any) => [...prevMessages, systemResponse]);

          setIsLoading(false);
        } else {
          // Trate o caso em que a API retorna null
          console.error("A API retornou null.");
          setIsLoading(false);
        }
      } catch (err) {
        console.error("Error: " + err);
      }
    }
  }

  const handleTypingComplete = () => {};

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleUserMessageSubmit();
    }
  }

  return {
    setMessagesForSuggestion,
    messages,
    userMessage,
    firstMessageCount,
    isLoading,
    setMessages,
    setUserMessage,
    receivedChunks,
    setIsLoading,
    handleUserMessageSubmit,
    handleTypingComplete,
    handleKeyDown,
  };
}
