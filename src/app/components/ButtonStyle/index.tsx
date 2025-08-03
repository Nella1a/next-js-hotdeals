const ButtonStyle = ({
  text,
  handleOnChange,
}: {
  text: string;
  handleOnChange: () => void;
}) => (
  <button
    className="w-32 md:w-40 py-2 rounded-sm border border-gray-300 bg-gray-200 cursor-pointer"
    onClick={handleOnChange}
  >
    {text}
  </button>
);

export default ButtonStyle;
