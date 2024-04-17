import React from "react";
import { CgClose } from "react-icons/cg";
import { BiCheck } from "react-icons/bi";
import { ButtonTypes } from "../utils/enums";

type ButtonProps = {
  type: ButtonTypes;
  disable?: boolean;
  answerCard?: () => void;
};

const Button = ({ type, answerCard, disable }: ButtonProps) => {
  let buttonIcon: React.JSX.Element;
  if (type === ButtonTypes.correct) {
    buttonIcon = <BiCheck className="text-white text-2xl" />;
  } else {
    buttonIcon = <CgClose className="text-white text-2xl" />;
  }
  return (
    <button className="bg-black px-3 py-1 hover:bg-gray-600" onClick={answerCard} disabled={disable}>
      {buttonIcon}
    </button>
  );
};

export default Button;
