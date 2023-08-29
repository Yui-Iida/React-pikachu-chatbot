import { useEffect, useRef, useState } from "react";
import { ThreeDots } from "react-loader-spinner";

export default function Response({ response, isLoading }) {
  const [latestResponse, setLatestResponse] = useState("");
  const [latestResponseUpdated, setLatestResponseUpdated] = useState(false);
  const [isHeigherThan100, setisHeigherThan100] = useState(false);
  const responseRef = useRef(null);

  useEffect(() => {
    if (!isLoading) {
      setLatestResponse(response);
      setLatestResponseUpdated(true);
    }
  }, [response, isLoading]);

  useEffect(() => {
    if (latestResponseUpdated && responseRef.current) {
      const clientHeight = responseRef.current.clientHeight;
      setisHeigherThan100(clientHeight >= 100);
    }
  }, [latestResponseUpdated]);

  console.log(isHeigherThan100);

  // useEffect(() => {
  //   if (responseRef.current) {
  //     setResponseHeight(responseRef.current.scrollHeight);
  //     console.log(responseHeight);
  //   }
  // }, [responseRef.current]);

  // console.log(responseRef);

  return (
    <div className="response m-6">
      <div className="flex items-center">
        <img src="/img/img-pikachu.PNG" alt="pikachu" className="h-10" />

        {isLoading && !latestResponseUpdated ? (
          <ThreeDots
            height="55"
            width="35"
            // radius="3"
            color="#ccc"
            ariaLabel="three-dots-loading"
            wrapperStyle={{ marginLeft: "15px" }}
            // wrapperClassName="ml-6 p-4"
            visible={true}
          />
        ) : null}

        {latestResponseUpdated && (
          <div ref={responseRef} className="relative">
            {/* (responseRef.current?.clientHeight >= 100 ? (
              <p>Heighter than 100px</p>
            ) : (
              <> */}
            <div
              className="bg-pink-300
              rounded-lg ml-6 p-4 max-w-xs"
            >
              <p>{response}</p>
            </div>
            <div
              className="absolute left-2
          bg-pink-300 w-5 h-8 clip-path-polygon-left"
              style={{ top: isHeigherThan100 ? "50px" : "10px" }}
            ></div>
            {/* </> */}
          </div>
        )}
      </div>
    </div>
  );
}
