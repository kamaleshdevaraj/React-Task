import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import Header from "../components/header";
import Navigation from "../components/navigation";
import DayCalender from "../components/daycalender";
import YearCalender from "../components/yearCalender";
import WeekCalendar from "../components/weekCalender";
import MonthlyCalendar from "../components/monthcalender";
import axios from "axios";

const Calendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs("2024-08-29"));
  const [select, setSelect] = useState<number>(0);
  const [data, setData] = useState([]);

  const handlePrevDay = () => {
    if (select === 0) {
      setSelectedDate(selectedDate.subtract(1, "day"));
    } else if (select === 1) {
      setSelectedDate(selectedDate.subtract(1, "week"));
    } else if (select === 2) {
      setSelectedDate(selectedDate.subtract(1, "month"));
    }
  };

  const handleNextDay = () => {
    if (select === 0) {
      setSelectedDate(selectedDate.add(1, "day"));
    } else if (select === 1) {
      setSelectedDate(selectedDate.add(1, "week"));
    } else if (select === 2) {
      setSelectedDate(selectedDate.add(1, "month"));
    }
  };

  useEffect(() => {
    axios
      .get("/calender-fromenddate.json")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("error", error);
      });
  }, []);

  return (
    <>
      <div className="sticky top-0 bg-white p-7 pb-2 z-1">
        <Header />
        <Navigation
          selectedDate={selectedDate}
          handlePrevDay={handlePrevDay}
          handleNextDay={handleNextDay}
          select={select}
          setSelect={setSelect}
          NavDate={
            select === 0
              ? selectedDate.format("DD MMMM YYYY")
              : select === 1
              ? `${selectedDate
                  .startOf("week")
                  .format("DD MMMM")} to ${selectedDate
                  .endOf("week")
                  .format("DD MMMM")}`
              : select === 2
              ? selectedDate.format("MMMM YYYY")
              : null
          }
        />
      </div>
      <div className="p-7 pt-0">
        {select === 0 ? (
          <DayCalender eventsData={data} selectedDate={selectedDate} />
        ) : select === 1 ? (
          <WeekCalendar eventsData={data} selectedDate={selectedDate} />
        ) : select === 2 ? (
          <MonthlyCalendar eventsData={data} selectedDate={selectedDate} />
        ) : select === 3 ? (
          <YearCalender />
        ) : null}
      </div>
    </>
  );
};

export default Calendar;
