// import { Configuration, OpenAIApi } from "openai";
import { useState, useEffect, useRef } from "react";
import OpenAI from "openai";
import "./App.css";
import Header from "./components/Header";
import Input from "./components/Input";
import Response from "./components/Response";
import MyQuestion from "./components/MyQuestion";

export default function App() {
  const [inputValue, setInputValue] = useState("");
  const [response, setResponse] = useState("");
  const [messageHistory, setMessageHistory] = useState([]);
  const [textareaHeight, setTextareaHeight] = useState(60);
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  // const [isLoadingResponse, setIsLoadingResponse] = useState(false);

  const chatAreaRef = useRef(null);

  const apiKey = "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";

  useEffect(() => {
    // コンポーネントが更新された際に最下部にスクロールする
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messageHistory]);

  useEffect(() => {
    if (response !== "")
      setMessageHistory([
        ...messageHistory,
        { role: "user", content: inputValue },
        { role: "pikachu", content: response },
      ]);
  }, [inputValue, response]);

  const openai = new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true, // ここあとで消す！！！！！！！！！！
  });

  const generateResponse = async (current) => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);

    try {
      const currentInputValue = current;
      // setResponse(`You asked me ${currentInputValue}`);

      // 使えるけど料金が発生するので保留
      const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are Pikachu from Pokemon.Please answer cute and smart like pikachu. The end of the sentences please always add ' , pika!' If the user write in Japanese, please say 'ピカ！' in the end",
          },
          { role: "user", content: currentInputValue },
        ],
      });

      setResponse(chatCompletion.choices[0].message.content);
    } catch (error) {
      if (error instanceof OpenAI.APIError) {
        console.error(error);
      } else {
        console.log(error);
      }
    } finally {
      // setTimeout(() => setIsLoading(false), 2000);
      setIsLoading(false);
    }
    console.log(response);
  };

  return (
    <div className="h-screen bg-gray-100 font-poppins flex flex-col dark:bg-neutral-700">
      <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <div
        ref={chatAreaRef}
        className="overflow-y-scroll mt-20"
        style={{ marginBottom: `${textareaHeight + 110}px` }}
      >
        {messageHistory?.map((message, index) =>
          message.role === "user" ? (
            <MyQuestion key={index} inputValue={message.content} />
          ) : (
            <Response
              key={index}
              response={message.content}
              isLoading={isLoading}
            />
          )
        )}
      </div>

      <Input
        inputValue={inputValue}
        setInputValue={setInputValue}
        setResponse={setResponse}
        generateResponse={generateResponse}
        messageHistory={messageHistory}
        setMessageHistory={setMessageHistory}
        textareaHeight={textareaHeight}
        setTextareaHeight={setTextareaHeight}
      />
    </div>
  );
}
