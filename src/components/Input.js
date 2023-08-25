import { useEffect, useState, useRef } from "react";
import { BsSend } from "react-icons/bs";
// import { Configuration, OpenAIApi } from "openai";

// const apiKey = "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";
// const apiUrl = "https://api.openai.com/v1/chat/completions";

export default function Input({
  inputValue,
  setInputValue,
  generateResponse,
  messageHistory,
  setMessageHistory,
  textareaHeight,
  setTextareaHeight,
}) {
  // const [inputValue, setInputValue] = useState("");
  // const [response, setResponse] = useState("");

  // const [textareaHeight, setTextareaHeight] = useState(60);
  const [isComposing, setIsComposing] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      setTextareaHeight(textareaRef.current.scrollHeight);
    }
  }, [textareaRef]);

  function adjustTextareaHeight() {
    if (textareaRef.current && textareaRef.current.scrollHeight > 48) {
      setTextareaHeight(textareaRef.current.scrollHeight);
    }
  }

  const handleInputKeyDown = (e) => {
    // if (e.key === "Enter" && e.shiftKey) console.log(textareaRef.current);
    // isComposing ? console.log("is composing") : console.log("NOT is composing");
    if (!isComposing && e.key === "Enter") {
      e.preventDefault(); // still create new line
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    const currentInputValue = textareaRef.current.value;
    setInputValue(currentInputValue);
    textareaRef.current.value = "";
    setTextareaHeight(60);

    // setMessageHistory([
    //   ...messageHistory,
    //   { role: "user", content: inputValue },
    //   // { role: "pikachu", content: response },
    // ]);
    // console.log("💚 handleSubmit", inputValue);
    // console.log(currentInputValue);
    generateResponse(currentInputValue);
  };

  // console.log(inputValue);
  // const handleSubmit = async () => {
  //   // e.preventDefault();

  //   setInputValue(textareaRef.current.value);
  //   textareaRef.current.value = "";
  //   setTextareaHeight(60);

  // console.log(inputValue);

  // try {
  //   // 1
  //   // const requestOptions = {
  //   //   method: "POST",
  //   //   headers: {
  //   //     "Content-Type": "application/json",
  //   //     Authorization: `Bearer ${apiKey}`,
  //   //   },
  //   //   body: JSON.stringify({ prompt: inputValue }),
  //   // };

  //   // const res = await fetch(apiUrl, requestOptions);

  //   // if (!res.ok) {
  //   //   throw new Error("Request failed");
  //   // }

  //   // 2
  //   const configuration = new Configuration({
  //     apiKey: apiKey,
  //   });

  //   const openai = new OpenAIApi(configuration);

  //   const data = await res.json();
  //   console.log(data);
  //   setResponse(data);
  //   // const res = await fetch(apiUrl, {
  //   //   method: "POST",
  //   //   headers: {
  //   //     "Content-Type": "application/json",
  //   //     Authorization: `Bearer ${apiKey}`,
  //   //   },
  //   //   body: JSON.stringify({
  //   //     model: "text-davinci-003",
  //   //     prompt: "Say this is a test",
  //   //     max_tokens: 50,
  //   //   }),
  //   // });

  //   // const res = await fetch("http://localhost:3000/chat", {
  //   //   method: "POST",
  //   //   headers: {
  //   //     "Content-Type": "application/json",
  //   //   },
  //   //   body: JSON.stringify({
  //   //     prompt: inputValue,
  //   //     max_tokens: 50,
  //   //   }),
  //   // });
  // } catch (error) {
  //   console.error("Fetch Error: ", error);
  // }
  // };
  console.log(inputValue);

  return (
    <footer className="h-auto w-screen bg-white p-10 bottom-0 left-0 right-0 fixed">
      <div
        id="input-area"
        className="bg-gray-200 h-20 p-4 rounded-xl flex items-center relative"
        style={{ height: `${textareaHeight + 32}px` }}
      >
        <textarea
          ref={textareaRef}
          id="textarea"
          placeholder="Ask Pikachu ..."
          className="bg-gray-200 flex-grow outline-none resize-none h-auto p-4"
          onChange={adjustTextareaHeight}
          onKeyDown={handleInputKeyDown}
          style={{ height: `${textareaHeight}px` }}
          onCompositionStart={(e) => setIsComposing(false)}
          onCompositionEnd={(e) => setIsComposing(true)}
          // value={inputValue}
        />
        <button className="px-4 py-2" onClick={handleSubmit}>
          <BsSend className="text-gray-600" />
        </button>
      </div>
    </footer>
  );
}
