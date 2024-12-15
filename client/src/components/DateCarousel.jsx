import React, { useState } from "react";

const   DateCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const dates = [
    { day: "Mon", date: 11 },
    { day: "Tue", date: 12 },
    { day: "Wed", date: 13 },
    { day: "Thu", date: 14 },
    { day: "Fri", date: 15 },
    { day: "Sat", date: 16 },
    { day: "Sun", date: 17 },
  ];

  const handleDateClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="carousel-container">
      <div className="carousel">
        {dates.map((dateObj, index) => (
          <div
            key={index}
            className={`carousel-item  ${activeIndex === index ? "active" : ""}`}
            onClick={() => handleDateClick(index)}
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
