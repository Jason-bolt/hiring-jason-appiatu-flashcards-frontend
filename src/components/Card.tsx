import React, { useState } from "react";
import ReactCardFlip from "react-card-flip";

type CardProps = {
  word: string;
  definition: string;
};

const Card = ({ word, definition }: CardProps) => {
  const [flip, setFlip] = useState(false);

  return (
    <>
      <ReactCardFlip isFlipped={flip} flipDirection="horizontal">
        <div
          className="border text-center text-3xl font-semibold h-64 flex items-center justify-center relative w-screen shadow-sm md:w-[450px]"
          onClick={() => setFlip(!flip)}
        >
          <p className="p-">{word}</p>
          <span className="absolute bottom-1 left-auto text-xs text-gray-400 font-normal">
            Click to flip
          </span>
        </div>

        <div
          className="border text-center text-lg h-64 flex items-center justify-center p-5 relative w-screen md:w-[450px]"
          onClick={() => setFlip(!flip)}
        >
          {definition}
          <span className="absolute bottom-1 left-auto text-xs text-gray-400 font-normal">
            Click to flip
          </span>
        </div>
      </ReactCardFlip>
    </>
  );
};

export default Card;
