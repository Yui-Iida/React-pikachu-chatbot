import { useEffect, useRef, useState } from "react";

export default function MyQuestion({ inputValue }) {
  const [isHeigherThan120, setisHeigherThan120] = useState(false);
  const [myQuestionPolygon, setMyQuestionPolygon] = useState(0);
  const questionRef = useRef(null);

  useEffect(() => {
    if (questionRef.current) {
      const clientHeight = questionRef.current.clientHeight;
      setisHeigherThan120(clientHeight >= 120);
      setMyQuestionPolygon(clientHeight / 3);
    }
  }, [questionRef]);

  return (
    <div className="my-question m-6">
      <div
        ref={questionRef}
        className="flex items-center relative right-0 justify-end"
      >
        <div className="bg-primary text-white font-extralight rounded-xl mr-6 p-4 max-w-xs dark:bg-secondary md:max-w-xl">
          <p>{inputValue}</p>
        </div>
        <img src="/img/img-ball.PNG" alt="pikachu" className="h-9" />
        <div
          className="absolute right-12 top-2 
          bg-primary w-5 h-8 clip-path-polygon-right dark:bg-secondary"
          style={{
            top: isHeigherThan120 ? `${myQuestionPolygon}px` : "10px",
          }}
        ></div>
      </div>
    </div>
  );
}
