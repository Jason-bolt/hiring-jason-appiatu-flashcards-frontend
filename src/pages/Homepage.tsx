import Button from "../components/Button";
import { ButtonTypes } from "../utils/enums";

const Homepage = () => {
  return (
    <>
      <section className="h-screen flex justify-center items-center">
        {/* Banner */}
        <div className="flex flex-col md:w-[450px] -mt-36">
          <div className="w-full text-center py-20 border shadow-md border-gray-700">
            <h1 className="text-5xl font-bold">
              <em>FLASH</em>
            </h1>
          </div>
          <div className="flex flex-row justify-between mt-4">
            <Button type={ButtonTypes.wrong} />
            <Button type={ButtonTypes.correct} />
          </div>
          <div className="text-center mt-6 text-gray-600">
            <p>
              Welcome to <em>FLASH!</em> A flashcard web app that uses simple
              spaced repetition to increase learning efficacy. Do feel free to
              explore the platform.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Homepage;
