import { IoIosCloseCircle, IoMdEye } from "react-icons/io";
import GoogleMeetIcon from "../assets/meet.png";
import { MdOutlineFileDownload } from "react-icons/md";
import dayjs from "dayjs";

type props = {
  isOpen: boolean;
  onClose: (value: React.SetStateAction<boolean>) => void;
  interviewDetails: any;
  id: number;
};

const MeetingLinkModel = ({ isOpen, onClose, interviewDetails, id }: props) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50"
      key={id}
    >
      <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6 relative border border-gray-300">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          onClick={() => onClose(false)}
        >
          <IoIosCloseCircle
            size={30}
            className="text-blue-600 cursor-pointer"
          />
        </button>
        <div className="border border-neutral-300 p-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="border-r border-neutral-300  pr-3 flex flex-col gap-3">
              <p className="text-sm font-semibold">
                Interview With:{" "}
                <span className="font-normal">
                  {interviewDetails?.user_det?.candidate?.candidate_firstName ??
                    "-"}
                </span>
              </p>
              <p className="text-sm font-semibold">
                Position:{" "}
                <span className="font-normal">
                  {interviewDetails?.job_id?.jobRequest_Role ?? "-"}
                </span>
              </p>
              <p className="text-sm font-semibold">
                Created By: <span className="font-normal">-</span>
              </p>
              <p className="text-sm font-semibold">
                Interview Date:{" "}
                <span className="font-normal">
                  {dayjs(interviewDetails?.start)?.format("DD-MMM-YYYY") ?? "-"}
                </span>
              </p>
              <p className="text-sm font-semibold">
                Interview Time:{" "}
                <span className="font-normal">
                  {" "}
                  {`${dayjs(interviewDetails?.start).format("hhA")} - ${dayjs(
                    interviewDetails?.end
                  ).format("hhA")}`}
                </span>
              </p>
              <p className="text-sm font-semibold">
                Interview Via:{" "}
                <span className="font-normal">{"Google Meet"}</span>
              </p>
              <div className="border-2 border-sky-500 p-2 flex justify-between align-center rounded">
                <span className="text-sky-500">{`Resume.docx`}</span>
                <span className="flex gap-1 mt-1">
                  <IoMdEye className="text-sky-500 font-bold text-lg" />
                  <MdOutlineFileDownload className="text-sky-500 font-bold text-lg" />
                </span>
              </div>
              <div className="border-2 border-sky-500 p-2 flex justify-between align-center rounded">
                <span className="text-sky-500">{`Adhaarcard`}</span>
                <span className="flex gap-1 mt-1">
                  <IoMdEye className="text-sky-500 font-bold text-lg" />
                  <MdOutlineFileDownload className="text-sky-500 font-bold text-lg" />
                </span>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center space-y-5">
              <div className="border border-neutral-300 p-2">
                <img
                  src={GoogleMeetIcon}
                  alt="Google Meet"
                  className="w-16 h-16"
                />
              </div>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium cursor-pointer"
                onClick={() =>
                  window.open(interviewDetails?.link ?? "www.google.com")
                }
              >
                JOIN
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingLinkModel;
