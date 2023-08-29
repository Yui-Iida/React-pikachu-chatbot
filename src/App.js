// import { Configuration, OpenAIApi } from "openai";
import OpenAI from "openai";

import { useState, useEffect, useRef } from "react";
import "./App.css";
import Contents from "./components/Contents";
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
  }, [response, inputValue]);

  const openai = new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true, // ここあとで消す！！！！！！！！！！
  });

  const generateResponse = async (current) => {
    setIsLoading(true);

    const currentInputValue = current;
    // setTimeout(() => {
    //   setResponse(`You asked me ${currentInputValue}`);
    // }, 2000);

    try {
      setResponse(`You asked me ${currentInputValue}`);
      // setMessageHistory([
      //   ...messageHistory,
      //   { role: "user", content: inputValue },
      //   { role: "pikachu", content: response },
      // ]);
      // setTimeout(() => {
      //   setResponse(`You asked me ${currentInputValue}`);
      //   setMessageHistory(newMessageHistory);
      //   setIsLoading(false);
      // }, 3000); // 適宜遅延時間を調整してください
      // 使えるけど料金が発生するので保留
      // const chatCompletion = await openai.chat.completions.create({
      //   model: "gpt-3.5-turbo",
      //   messages: [{ role: "user", content: currentInputValue }],
      // });
      // setResponse(chatCompletion.choices[0].message.content);
      // console.log(chatCompletion.choices[0].message.content);
      // Frontend check
      // await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      if (error instanceof OpenAI.APIError) {
        console.error(error);
      } else {
        // Non-API error
        console.log(error);
      }
    } finally {
      setTimeout(() => setIsLoading(false), 2000);
      // setIsLoading(false);
    }
    console.log(response);
  };

  console.log("MessageHistory", messageHistory);

  return (
    <div className="h-screen bg-gray-100 font-poppins flex flex-col dark:bg-slate-800">
      <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <div
        ref={chatAreaRef}
        className="overflow-y-scroll mt-20"
        style={{ marginBottom: `${textareaHeight + 100}px` }}
      >
        {/* <Contents /> */}
        {messageHistory?.map((message, index) =>
          message.role === "user" ? (
            <MyQuestion key={index} inputValue={message.content} />
          ) : (
            <Response
              key={index}
              response={message.content}
              isLoading={isLoading}
              // onChange={(index) => console.log("In Respomse", index)}
            />
          )
        )}
        {/* {inputValue?.map((input, index) => (
        <MyQuestion input={input} key={index} />
      ))}
      {response ? <Response response={response} /> : ""} */}
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
