import React, { useState } from "react";
import CountDown from "./CountDown";
import { BiSolidEditAlt } from "react-icons/bi";
import { LiaTrashAltSolid } from "react-icons/lia";

type ProfileCardProps = {
  cardId: number;
  word: string;
  definition: string;
  wrongly_answered_count: number;
  bin: string;
  time_to_appear: Date;
  toggleEditModal: () => void;
  deleteCard: (cardId: number) => void;
};

const ProfileCard = ({
  cardId,
  word,
  definition,
  wrongly_answered_count,
  bin,
  time_to_appear,
  toggleEditModal,
  deleteCard,
}: ProfileCardProps) => {
  const [currentBin, setCurrentBin] = useState(bin);

  if (currentBin === "12") setCurrentBin("Hard to remember");
  return (
    <section className="border text-start flex flex-col justify-start items-start ps-5 pr-5 pt-5 pb-14 w-screen shadow-sm gap-5 rounded-md relative md:w-[450px]">
      <div className="flex flex-col items-start justify-center">
        <h1 className="font-semibold">Word:</h1>
        <p className="text-gray-600 text-sm">{word}</p>
      </div>
      <div className="flex flex-col items-start justify-center">
        <h1 className="font-semibold">Definition:</h1>
        <p className="text-gray-600 text-sm">{definition}</p>
      </div>
      <div className="flex flex-col items-strt justify-center">
        <h1 className="font-semibold">Wrongly answered:</h1>
        <p className="text-gray-600 text-sm">
          {wrongly_answered_count} time(s)
        </p>
      </div>
      <div className="flex flex-col items-start justify-center">
        <h1 className="font-semibold">Bin:</h1>
        <p className="text-gray-600 text-sm">{currentBin}</p>
      </div>
      <div className="flex flex-col items-start justify-center">
        <h1 className="font-semibold">Time to show:</h1>
        <p className="text-gray-600 text-sm">
          <CountDown endTime={time_to_appear} />
        </p>
      </div>
      {/* Edit and delete button */}
      <div className={`absolute bottom-5 left-auto flex flex-row gap-5`}>
        <button className="hover:cursor-pointer" onClick={toggleEditModal}>
          <BiSolidEditAlt className="text-sm text-blue-600" />
        </button>
        <button
          className="hover:cursor-pointer"
          onClick={() => {
            const shouldDelete = confirm("Do you want to delete this card?");
            if (shouldDelete) deleteCard(cardId);
          }}
        >
          <LiaTrashAltSolid className="text-sm text-red-600" />
        </button>
      </div>
    </section>
  );
};

export default ProfileCard;
