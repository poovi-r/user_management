import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const EditUserHeader = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 text-sm"
    >
      <MdArrowBack className="text-xl" /> Back
    </button>
  );
};

export default EditUserHeader;