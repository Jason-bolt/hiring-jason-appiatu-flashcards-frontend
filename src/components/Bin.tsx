import React from "react";

type BinProps = {
  bin: string;
  count: number;
};

const Bin = ({ bin, count }: BinProps) => {
  let content: React.JSX.Element;
  if (bin === '12') {
    content = (
      <p className="font-semibold text-xs">Hard to remember</p>
    )
  } else {
    content = (
      <p className="font-semibold">Bin {bin}</p>
    )
  }
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="border-2 border-gray-500 p-4 flex flex-col items-center rounded-md">
          <h1 className="text-2xl">{count}</h1>
          <p className="text-xs text-gray-400">word(s)</p>
        </div>
        {content}
      </div>
    </>
  );
};

export default Bin;
