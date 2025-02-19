import dayjs from "dayjs";
import EventCard from "./eventcard";
import { FromEndDateData } from "../types/type";

type props = {
  eventsData: FromEndDateData[];
  selectedDate: dayjs.Dayjs;
};

export default function DayCalender({ eventsData, selectedDate }: props) {
  const events = eventsData?.filter((e) =>
    dayjs(selectedDate).isSame(e.start, "date")
  );

  return (
    <div className="border border-slate-200 rounded-lg shadow-md">
      {[...Array(24)].map((_, hour) => {
        const hourEvents = events?.filter((e) =>
          Number(dayjs(e.start).hour() === hour)
        );
        return (
          <div
            key={hour}
            className="border-t border-slate-200 py-5 flex items-center"
          >
            <span className="w-16 text-right text-sm text-sky-500 ">
              {hour % 12 === 0 ? 12 : hour % 12} {hour < 12 ? "AM" : "PM"}
            </span>
            <div className="flex-1 border-l ml-3 p-2 h-25 border-slate-200 relative">
              {hourEvents?.length ? (
                <EventCard
                  title={hourEvents?.[0]?.user_det?.job_id?.jobRequest_Title}
                  interviewer={`${
                    hourEvents?.[0]?.user_det?.handled_by?.firstName ?? "-"
                  } ${hourEvents?.[0]?.user_det?.handled_by?.lastName ?? ""}`}
                  time={`${dayjs(hourEvents?.[0]?.start).format(
                    "hhA"
                  )} - ${dayjs(hourEvents?.[0]?.end).format("hhA")}`}
                  count={hourEvents?.length}
                  events={hourEvents}
                  multipleEvents={hourEvents}
                />
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}
