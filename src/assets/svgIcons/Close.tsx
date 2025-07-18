type CloseTypes = {
  onClick?: () => void;
  fill?: string;
  dimensions?: {
    width: string;
    height: string;
  };
};

const Close = ({ onClick, fill, dimensions }: CloseTypes) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={dimensions?.height || "24px"}
      viewBox="0 -960 960 960"
      width={dimensions?.width || "24px"}
      fill={fill || "#5f6368"}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
    </svg>
  );
};

export default Close;
