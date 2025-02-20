import dayjs from "dayjs";
import EventCard from "./eventcard";
import { FromEndDateData } from "../types/type";

type Props = {
  eventsData: FromEndDateData[];
  selectedDate: dayjs.Dayjs;
};

export default function WeekCalendar({ eventsData, selectedDate }: Props) {
  const startOfWeek = dayjs(selectedDate).startOf("week");
  const weekDays = [...Array(7)].map((_, ind) => startOfWeek.add(ind, "day"));

  return (
    <div className="border border-slate-200 rounded-lg shadow-md">
      <div className="grid grid-cols-8 border-b border-slate-200 py-2 px-4 ">
        <div className="text-sm font-semibold text-gray-600 mt-3">Time</div>
        {weekDays.map((day) => (
          <div
            key={day.toString()}
            className="text-sm font-semibold p-3 text-center text-sky-500"
          >
            {day.format("DD MMM dddd")}
          </div>
        ))}
      </div>

      {[...Array(24)].map((_, hour) => (
        <div
          key={hour}
          className="grid grid-cols-8 border-t border-slate-200 py-3"
        >
          <div className="text-center text-sm text-sky-500 pr-2 relative top-22">
            {hour % 12 === 0 ? 12 : hour % 12} {hour < 12 ? "AM" : "PM"}
          </div>

          {weekDays.map((day) => {
            const dayEvents = eventsData.filter(
              (e) =>
                dayjs(e.start).isSame(day, "date") &&
                dayjs(e.start).hour() === hour
            );

            return (
              <div
                key={day.toString()}
                className="border-l border-slate-200  h-25 relative "
              >
                {dayEvents.length > 0 && (
                  <EventCard
                    weeklywidth
                    title={dayEvents[0]?.user_det?.job_id?.jobRequest_Title}
                    interviewer={`${
                      dayEvents[0]?.user_det?.handled_by?.firstName ?? "-"
                    } ${dayEvents[0]?.user_det?.handled_by?.lastName ?? ""}`}
                    time={`${dayjs(dayEvents[0]?.start).format(
                      "hhA"
                    )} - ${dayjs(dayEvents[0]?.end).format("hhA")}`}
                    count={dayEvents.length}
                    events={dayEvents}
                    multipleEvents={dayEvents}
                  />
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
