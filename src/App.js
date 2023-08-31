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

  const chatAreaRef = useRef(null);

  const apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messageHistory]);

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
      // Dammy data
      // setResponse(`You asked me ${currentInputValue}`);
      // setMessageHistory([
      //   ...messageHistory,
      //   { role: "user", content: currentInputValue },
      //   { role: "pikachu", content: `You asked me ${currentInputValue}` },
      // ]);

      // 使えるけど料金が発生するので注意
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

      setMessageHistory([
        ...messageHistory,
        { role: "user", content: currentInputValue },
        { role: "pikachu", content: chatCompletion.choices[0].message.content },
      ]);
    } catch (error) {
      if (error instanceof OpenAI.APIError) {
        console.error(error);
      } else {
        console.log(error);
      }
    } finally {
      setTimeout(() => setIsLoading(false), 2000);
    }
  };

  return (
    <div className="font-poppins flex flex-col h-screen  bg-gray-100 dark:bg-neutral-700">
      <Header
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        className="flex-none z-10"
      />

      <div
        ref={chatAreaRef}
        style={{ marginBottom: `${textareaHeight + 110}px` }}
        className="overflow-y-scroll w-full mt-20 z-0"
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
        className="flex-none z-10"
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
