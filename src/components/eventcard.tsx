import { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import MeetingLinkModel from "./meetlinkmodel";
import dayjs from "dayjs";
import OutsideClickHandler from "react-outside-click-handler";

type props = {
  title: string;
  interviewer: string;
  time: string;
  count: number;
  events: any[];
  multipleEvents: any;
  monthlywidth?: boolean;
};

const EventCard = ({
  title,
  interviewer,
  time,
  count = 1,
  multipleEvents,
  monthlywidth,
}: props) => {
  const [openModel, setOpenModel] = useState<boolean>(false);
  const [hover, setHover] = useState<boolean>(false);
  const [data, setData] = useState();
  const [number, setNumber] = useState<number>();

  return (
    <div className={`relative ${monthlywidth ? "w-50 ml-1" : "w-64"} `}>
      <div
        className={`flex items-center p-3 shadow-md rounded-lg border ${
          count > 1
            ? "bg-sky-100 border-none cursor-pointer z-10 "
            : "bg-white border-slate-200 z-10 "
        } `}
        onClick={() => count > 1 && setHover(true)}
      >
        <div className="w-3 bg-blue-600 h-20"></div>
        <div className="ml-3">
          <p className="text-sm font-semibold text-black-400">{title}</p>
          <p className="text-sm font-semibold text-black-400">
            Interviewer: {interviewer}
          </p>
          <p className="text-sm font-semibold text-black-400">Time: {time}</p>
        </div>
        {count > 1 && (
          <div className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full">
            {count}
          </div>
        )}
      </div>
      <OutsideClickHandler
        onOutsideClick={() => {
          setHover(false);
        }}
      >
        {hover && count > 1 && (
          <div
            className={`absolute top-0 ${
              monthlywidth ? "left-54" : " left-67"
            }   w-72 bg-white shadow-lg border border-gray-300 rounded-lg p-3 z-1 `}
          >
            {multipleEvents?.map((event: any, index: number) => (
              <div
                onClick={() => {
                  setData(event);
                  setNumber(event?.id);
                  setOpenModel(true);
                }}
                key={index}
                className="bg-white p-2 rounded-md shadow flex justify-between items-center border border-gray-200 mb-2 last:mb-0 cursor-pointer"
              >
                <div className="w-2 bg-blue-600 h-20"></div>
                <div key={event.id}>
                  <div className="flex align-center justify-between w-60 py-1 ">
                    <div>
                      <p className="text-sm font-semibold ml-2">
                        {event?.job_id.jobRequest_Title ?? "-"}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <FiEdit className="text-gray-500 cursor-pointer" />
                      <FiTrash2 className="text-red-500 cursor-pointer" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-3">
                      <p className="text-xs text-black-500 border-r px-2">
                        {event?.summary}
                      </p>
                      <p className="text-xs text-black-500">
                        Interviewer:
                        {event?.user_det?.handled_by?.firstName ?? "-"}
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <p className="text-xs text-black-500 border-r px-1 ml-2">
                        Date: {dayjs(event?.start)?.format("DD-MMM-YYYY")}
                      </p>
                      <p className="text-xs text-gray-600">
                        Time:
                        {`${dayjs(event.start).format("hhA")} - ${dayjs(
                          event.end
                        ).format("hhA")}`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </OutsideClickHandler>
      {openModel ? (
        <MeetingLinkModel
          id={number ?? 0}
          isOpen={openModel}
          onClose={() => {
            setOpenModel(false), setHover(true);
          }}
          interviewDetails={data}
        />
      ) : null}
    </div>
  );
};

export default EventCard;
