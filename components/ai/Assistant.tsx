import { AiOutlinePlus } from "react-icons/ai";


export default function Assistant() {

  return (
    <div className="absolute bottom-4 right-4 z-40">
      <div className="flex flex-col items-center justify-center w-14 h-14 bg-green-500 rounded-full shadow-lg relative z-50 hover:scale-110 transition-all">
        <div className="w-12 h-12 bg-green-700 rounded-full  grid place-content-center">
          <AiOutlinePlus className="w-10 h-10 animate-pulse" />
        </div>
      </div>
    </div>
  )
}
