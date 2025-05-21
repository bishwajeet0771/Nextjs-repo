"use client";
type Props = {
  url: string;
  name:string
};
const ViewAllButton: React.FC<Props> = ({ url, name }) => {
  const handleView = () => {
    window.open(url, "_blank");
  };
  return (
    <button
    name={name}
      className="inline-flex max-w-fit justify-center items-center gap-2.5 rounded p-2.5 bg-[#41d1d44d] text-white text-xl not-italic font-bold leading-[normal] tracking-[0.4px]"
      onClick={handleView}
    >
      View Detail
    </button>
  );
};
export default ViewAllButton;
