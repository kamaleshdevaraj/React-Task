import dayjs from "dayjs";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

type NavigationProps = {
  selectedDate: dayjs.Dayjs;
  handlePrevDay: () => void;
  handleNextDay: () => void;
  select: number;
  setSelect: React.Dispatch<React.SetStateAction<number>>;
  NavDate: string | null;
};

const Navigation = ({
  selectedDate,
  handlePrevDay,
  handleNextDay,
  setSelect,
  select,
  NavDate,
}: NavigationProps) => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <button
          onClick={handlePrevDay}
          className="flex items-center text-neutral-400 border border-sky-400 font-medium shadow-md rounded rounded-md px-1 py-1 cursor-pointer"
        >
          <IoIosArrowBack className="text-neautral-500 text-lg " />
        </button>

        <button
          onClick={handleNextDay}
          className="flex items-center text-neutral-400 border border-sky-400  font-medium shadow-md rounded rounded-md px-1 py-1 cursor-pointer"
        >
          <IoIosArrowForward className="text-neautral-500 text-lg " />
        </button>
        <span className="flex items-center text-sky-600 font-medium shadow-md rounded-md px-3 py-2 ">
          {
            <span className="text-sm mx-1">
              {selectedDate.format("D") ?? "01"}
            </span>
          }
        </span>
      </div>
      <span className=" font-medium">{NavDate || null}</span>
      <div className="flex space-x-4  p-2 text-gray-500">
        {["Day", "Week", "Month", "Year"].map((label, index) => (
          <span
            key={index}
            className={`${
              select === index
                ? "underline underline-offset-8 decoration-blue-500 decoration-2 font-semibold"
                : ""
            } cursor-pointer font-medium text-black`}
            onClick={() => {
              setSelect(index);
              handleScrollToTop();
            }}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Navigation;
