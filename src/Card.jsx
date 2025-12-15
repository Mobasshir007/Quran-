import React from "react";
import flower from "./assets/flower.jpg";

const Card = ({ data, onSelect }) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {data.map(item => (
        <div
          key={item.number}
          onClick={() => onSelect(item.number)}
          className="m-10 h-60 w-40 border-2 bg-purple-300 cursor-pointer"
        >
          <img className="h-24" src={flower} alt="" />

          <div className="flex gap-2">
            <p>{item.number}.</p>
            <h1>{item.name}</h1>
          </div>

          <p>{item.englishName}</p>
        </div>
      ))}
    </div>
  );
};


export default Card;
