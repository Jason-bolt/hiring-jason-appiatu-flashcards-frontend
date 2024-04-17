import { useForm } from "react-hook-form";

type EditCardProps = {
  loading: boolean;
  toggleEditModal: () => void;
  submitEditCard: (data: {
    word: string;
    definition: string;
    cardId: number;
  }) => void;
  word: string;
  definition: string;
  cardId: number;
};

const EditCardModal = ({
  toggleEditModal,
  cardId,
  word,
  definition,
  submitEditCard,
  loading,
}: EditCardProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      word,
      definition,
      cardId,
    },
  });

  return (
    <>
      <section className="fixed flex items-center justify-center backdrop-blur-sm bg-gray-900 bg-opacity-60 z-50 left-0 top-0 bottom-0 w-screen h-screen">
        <div className="bg-white rounded p-10 md:w-3/5 lg:w-2/5">
          <h1 className="text-center font-semibold mb-2">Edit Card</h1>
          <form onSubmit={handleSubmit(submitEditCard)}>
            <label htmlFor="" className="text-sm font-semibold">
              Word
            </label>
            <input hidden {...register("cardId")} />
            <input
              type="text"
              {...register("word", { required: "This field is required!" })}
              className="w-full border rounded-md py-3 px-3 mt-1 text-gray-600 placeholder:text-gray-300 placeholder:text-sm"
              placeholder="Enter word..."
            />
            <p className="text-xs text-red-600">{errors.word?.message}</p>

            <br />
            <br />

            <label htmlFor="" className="text-sm font-semibold">
              Definition
            </label>
            <textarea
              {...register("definition", {
                required: "This field is required!",
                maxLength: 250,
              })}
              className="w-full border rounded-md py-2 px-3 mt-1 text-gray-600 placeholder:text-gray-300 placeholder:text-sm"
              placeholder="Enter word definition..."
              maxLength={250}
              rows={5}
            ></textarea>
            <p className="text-xs text-red-600">{errors.definition?.message}</p>

            <div className="flex flex-row justify-center text-xs mt-5 gap-5">
              <div
                className="btn bg-black text-white px-3 py-1 rounded-md hover:cursor-pointer hover:bg-gray-700"
                onClick={toggleEditModal}
              >
                Cancel
              </div>
              <button
                type="submit"
                className="btn text-black border border-black px-3 py-1 rounded-md flex justify-center items-center gap-2 hover:cursor-pointer hover:bg-gray-200"
              >
                {loading && <div className="loader"></div>}
                Save
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default EditCardModal;
