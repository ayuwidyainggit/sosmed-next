import { IoPerson } from "react-icons/io5";

export default function Story({ onClick }) {
  return (
    <div className="bg-white shadow-sm rounded-md p-4">
      <div className="flex">
        <IoPerson style={{ height: "30px", width: "30px" }} />
        <button
          className="bg-gray-100 w-full text-left px-4 rounded-full"
          onClick={onClick}
        >
          What&#39;s on your mind?
        </button>
      </div>
    </div>
  );
}
