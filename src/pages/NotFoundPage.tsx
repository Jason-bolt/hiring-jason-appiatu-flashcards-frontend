
const NotFoundPage = () => {
  return (
    <section className="bg-white">
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-5xl font-black">404</h1>
        <p className="text-gray-500 text-sm">
          Page could not be found. Return to <a href="/" className="text-black underline hover:cursor-pointer">Home screen</a>
        </p>
      </div>
    </section>
  );
};

export default NotFoundPage;
