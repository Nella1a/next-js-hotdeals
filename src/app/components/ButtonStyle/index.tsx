const ButtonStyle = ({
  text,
  handleOnChange,
}: {
  text: string;
  handleOnChange: () => void;
}) => (
  <button
    className="w-42 py-2 rounded-sm border border-gray-300 bg-gray-200"
    onClick={handleOnChange}
  >
    {text}
  </button>
);

export default ButtonStyle;
