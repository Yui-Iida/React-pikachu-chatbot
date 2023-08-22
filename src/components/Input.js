import { useEffect, useState, useRef } from "react";
import { BsSend } from "react-icons/bs";

export default function Input() {
  const [inputValue, setInputValue] = useState("");
  const [textareaHeight, setTextareaHeight] = useState(60);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      setTextareaHeight(textareaRef.current.scrollHeight);
    }
  }, []);

  function adjustTextareaHeight() {
    if (textareaRef.current && textareaRef.current.scrollHeight > 48) {
      setTextareaHeight(textareaRef.current.scrollHeight);
    }
  }

  const handleInputKeyUp = (e) => {
    if (e.key === "Enter") {
      handleInputChange(e);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(textareaRef.current.value);
    textareaRef.current.value = "";
    setTextareaHeight(60);
  };
  console.log(inputValue);

  return (
    <footer className="h-auto w-screen bg-white p-10 fixed bottom-0">
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
          onKeyUp={handleInputKeyUp}
          style={{ height: `${textareaHeight}px` }}
        />
        <button className="px-4 py-2" onClick={handleInputChange}>
          <BsSend className="text-gray-600" />
        </button>
      </div>
    </footer>
  );
}
