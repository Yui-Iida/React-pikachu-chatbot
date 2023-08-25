export default function Response({ response }) {
  return (
    <div className="response m-6">
      <div className="flex items-center relative">
        <img src="/img/img-pikachu.PNG" alt="pikachu" className="h-10" />

        {/* <div
          className=" bg-pink-300 rounded-lg ml-20 p-4 absolute 
          before:content-[''] before:absolute before:w-4
          before:border-4 before:top-3 before:-left-4 
          before:top-full before:border-transparent before:border-r-pink-300"
        > */}
        <div className="bg-pink-300 rounded-lg ml-6 p-4">
          <p>{response}</p>
        </div>
        <div
          className="absolute left-14 top-2
          bg-pink-300 w-5 h-8 clip-path-polygon-left"
        ></div>
      </div>
    </div>
  );
}
