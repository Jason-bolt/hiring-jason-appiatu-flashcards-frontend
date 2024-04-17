import Button from "../components/Button";
import { ButtonTypes } from "../utils/enums";

const Homepage = () => {
  return (
    <>
      <section className="h-screen flex justify-center items-center">
        {/* Banner */}
        <div className="flex flex-col items-center -mt-14">
          <div className="md:w-[450px]">
            <div className="w-full text-center py-20 border shadow-md border-gray-700">
              <h1 className="text-5xl font-bold">
                <em>FLASH</em>
              </h1>
            </div>
            <div className="flex flex-row justify-between mt-4">
              <Button type={ButtonTypes.wrong} />
              <Button type={ButtonTypes.correct} />
            </div>
          </div>
          <div className="text-center mt-6 text-sm text-gray-600 md:w-3/5">
            <p>Welcome to FLASH !!!</p>
            <p>
              Where you get to turbocharge your learning with our exhilarating
              flashcard web app! Say goodbye to boring study routines and hello
              to the thrill of simple spaced repetition! Each correct answer
              catapults your card into a bin, but the kicker is the higher the
              bin number, the longer it takes for the card to resurface,
              maximising your memory retention like never before! Supercharge
              your learning journey today while having fun with FLASH !!!!
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Homepage;
