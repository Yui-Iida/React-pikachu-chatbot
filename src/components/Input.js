import { useEffect, useState, useRef } from "react";
import { BsSend } from "react-icons/bs";

export default function Input({
  setInputValue,
  generateResponse,
  textareaHeight,
  setTextareaHeight,
}) {
  const [isComposing, setIsComposing] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      setTextareaHeight(textareaRef.current.scrollHeight);
    }
  }, [textareaRef, setTextareaHeight]);

  const adjustTextareaHeight = () => {
    if (textareaRef.current && textareaRef.current.scrollHeight > 48) {
      setTextareaHeight(textareaRef.current.scrollHeight);
    }
  };

  const handleInputKeyDown = (e) => {
    if (!isComposing && e.key === "Enter") {
      e.preventDefault(); // still create new line
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (textareaRef.current.value === "") return;

    const currentInputValue = textareaRef.current.value;
    setInputValue(currentInputValue);
    textareaRef.current.value = "";
    setTextareaHeight(60);

    generateResponse(currentInputValue);
  };

  return (
    <footer className="h-auto w-screen bg-white p-10 bottom-0 left-0 right-0 fixed flex-none z-10 dark:bg-black">
      <div
        id="input-area"
        className="bg-gray-200 h-20 p-4 rounded-[35px] flex items-center relative dark:bg-neutral-500"
        style={{ height: `${textareaHeight + 32}px` }}
      >
        <textarea
          ref={textareaRef}
          id="textarea"
          placeholder="Ask Pikachu ..."
          className="bg-transparent flex-grow outline-none resize-none h-auto p-4 dark:text-gray-300 dark:placeholder-gray-300"
          onChange={adjustTextareaHeight}
          onKeyDown={handleInputKeyDown}
          style={{ height: `${textareaHeight}px` }}
          onCompositionStart={(e) => setIsComposing(false)}
          onCompositionEnd={(e) => setIsComposing(true)}
        />
        <button className="px-4 py-2" onClick={handleSubmit}>
          <BsSend className="text-gray-400 dark:text-gray-300" />
        </button>
      </div>
    </footer>
  );
}
