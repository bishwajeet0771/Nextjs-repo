const BrokerContactTag = ({
  isBrokerAllowed,
  className,
  isUsed,
}: {
  isBrokerAllowed: boolean;
  className?: string;
  isUsed?: string;
}) => {
  return (
    <div
      className={`flex flex-col gap-2 justify-start items-start mt-[20px] md:mt-[26px] ${className}`}
    >
      {isUsed === "N" && (
        <p className="text-base bg-yellow-400 px-3 text-black top-0 left-[0.8px] font-semibold">
          Unused
        </p>
      )}
      {isBrokerAllowed && (
        <div
          className={`bg-green-100 text-nowrap text-green-800 font-semibold p-1 sm:px-4 sm:py-2 rounded-r-sm shadow-lg text-xs md:text-sm`}
        >
          Broker-Friendly Listing
        </div>
      )}
    </div>
  );
};

export default BrokerContactTag;
