import { useEffect, useRef, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { ThreeDots } from "react-loader-spinner";
import { MdDone } from "react-icons/md";

export default function Response({ response, isLoading }) {
  const [latestResponse, setLatestResponse] = useState("");
  const [latestResponseUpdated, setLatestResponseUpdated] = useState(false);
  const [isHeigherThan120, setisHeigherThan120] = useState(false);
  const [responsePolygon, setResponsePolygon] = useState(0);
  const [showHoverMenu, setShowHoverMenu] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
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
      setisHeigherThan120(clientHeight >= 120);
      setResponsePolygon(clientHeight / 3);
    }
  }, [latestResponseUpdated]);

  const mouseEnter = () => {
    setShowHoverMenu(true);
  };

  const mouseLeave = () => {
    setShowHoverMenu(false);
  };

  const handleCopy = () => {
    setIsCopied(true);
  };

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
            visible={true}
          />
        ) : null}

        {latestResponseUpdated && (
          <div ref={responseRef} className="relative">
            <div
              className="bg-white font-light
              rounded-xl ml-6 p-4 max-w-xs dark:bg-neutral-950 dark:text-white md:max-w-xl"
              onMouseEnter={mouseEnter}
              onMouseLeave={mouseLeave}
            >
              <p>{response}</p>
              {showHoverMenu && (
                <div className="absolute -right-5 -bottom-2 bg-primary py-1 px-3 text-white font-extralight rounded-lg dark:bg-secondary">
                  <CopyToClipboard text={response} onCopy={handleCopy}>
                    <button className="flex items-center gap-1">
                      {isCopied ? <MdDone /> : ""}Copy
                    </button>
                  </CopyToClipboard>
                </div>
              )}
            </div>
            <div
              className="absolute left-2
          bg-white w-5 h-8 clip-path-polygon-left dark:bg-neutral-950"
              style={{
                top: isHeigherThan120 ? `${responsePolygon}px` : "10px",
              }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
}
