import React, { useState, useRef, useEffect } from "react";
import moment from "moment/moment";

const DateCarousel = ({ onDateChange }) => {
  const [activeIndex, setActiveIndex] = useState(moment().format("DD") - 1);
  const carouselRef = useRef(null);

  const currentMonthDates = Array.from(
    { length: moment().daysInMonth() },
    (x, i) => moment().startOf("month").add(i, "days")
  );

  useEffect(() => {
    if (carouselRef.current) {
      const activeItem = carouselRef.current.children[activeIndex];
      if (activeItem) {
        activeItem.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [activeIndex]);

  const dates = currentMonthDates.map((x) => ({
    day: x.format("ddd"),
    date: x.format("DD"),
    fullDate: x,
  }));

  const handleDateClick = (dateObj) => {
    onDateChange(dateObj.fullDate.format("YYYY-MM-DD"))
    console.log(dateObj.fullDate.format("YYYY-MM-DD"));
    setActiveIndex(dateObj.date - 1);
  };

  return (
    <div className="carousel-container">
      <div
        className="carousel"
        ref={carouselRef}
        style={{ display: "flex", overflowX: "auto" }}
      >
        {dates.map((dateObj, index) => (
          <div
            key={index}
            className={`carousel-item  ${
              activeIndex === index ? "active" : ""
            }`}
            onClick={() => handleDateClick(dateObj)}
          >
            <p>{dateObj.day}</p>
            <p>{dateObj.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DateCarousel;
