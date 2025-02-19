import dayjs from "dayjs";
import EventCard from "./eventcard";
import { FromEndDateData } from "../types/type";

type Props = {
  eventsData: FromEndDateData[];
  selectedDate: dayjs.Dayjs;
};

export default function MonthlyCalendar({ eventsData, selectedDate }: Props) {
  const startOfMonth = dayjs(selectedDate).startOf("month");
  const endOfMonth = dayjs(selectedDate).endOf("month");
  const startOfWeek = startOfMonth.startOf("week");
  const endOfWeek = endOfMonth.endOf("week");

  const days = [];
  let currentDay = startOfWeek;

  while (
    currentDay.isBefore(endOfWeek, "day") ||
    currentDay.isSame(endOfWeek, "day")
  ) {
    days.push(currentDay);
    currentDay = currentDay.add(1, "day");
  }

  return (
    <div className="border border-slate-200 rounded-lg shadow-md">
      <div className="grid grid-cols-7 border-b border-slate-200 py-2 px-4 ">
        {[
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ].map((day) => (
          <div
            key={day}
            className="text-sm font-semibold p-4 text-center text-sky-500"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {days.map((day) => {
          const dayEvents = eventsData.filter((e) =>
            dayjs(e.start).isSame(day, "date")
          );

          return (
            <div
              key={day.toString()}
              className={`border border-slate-200 p-2 h-40 relative ${
                day.month() !== selectedDate.month() ? "text-gray-300" : ""
              }`}
            >
              <div className="text-lg text-center text-black-600 ">
                {day.format("DD")}
              </div>
              {dayEvents.length > 0 && (
                <div className="absolute top-10 left-0">
                  <EventCard
                    monthlywidth
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
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
