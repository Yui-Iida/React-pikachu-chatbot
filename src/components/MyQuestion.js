export default function MyQuestion({ inputValue }) {
  return (
    <div className="my-question m-6">
      <div className="flex items-center relative right-0 justify-end">
        <div className="bg-blue-400 rounded-lg mr-6 p-4 max-w-xs">
          <p>{inputValue}</p>
        </div>
        <img src="/img/img-ball.PNG" alt="pikachu" className="h-9" />
        <div
          className="absolute right-12 top-2 
          bg-blue-400 w-5 h-8 clip-path-polygon-right"
        ></div>
      </div>
    </div>
  );
}
