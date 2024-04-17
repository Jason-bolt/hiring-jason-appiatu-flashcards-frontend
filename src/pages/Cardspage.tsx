import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Button from "../components/Button";
import { ButtonTypes } from "../utils/enums";
import Bin from "../components/Bin";
import { useQuery, useMutation } from "@apollo/client";
import cardQueries from "../graphql/queries/cardQueries";
import cardMutations from "../graphql/mutations/cardMutations";
import toast from "react-hot-toast";

const { ANSWER_CARD } = cardMutations;
const { FETCH_DISPLAY_CARD } = cardQueries;

const Cardspage = () => {
  const { loading, error, data, refetch } = useQuery(FETCH_DISPLAY_CARD);
  const [answerCard, { data: mutationData, loading: loadingMutation }] =
    useMutation(ANSWER_CARD);
  const [isCardCorrect, setIsCardCorrect] = useState(true);

  useEffect(() => {
    refetch();
  }, []);

  const answerCardFunction = (
    isRight: boolean,
    cardId: number,
    bin: string
  ) => {
    answerCard({
      variables: {
        isCorrect: isRight,
        cardId,
        bin: parseInt(bin),
      },
    });
  };

  useEffect(() => {
    if (mutationData?.answerCard?.status === "200") {
      if (isCardCorrect) {
        toast.success("Correctly answered 🥳");
      } else {
        toast.error("Wrongly answered 😑");
      }
      refetch();
    }
    if (mutationData?.answerCard?.status === "400") {
      toast.error(mutationData?.answerCard.message);
    }
  }, [mutationData]);

  let content: React.JSX.Element;
  if (loading) {
    content = (
      <section className="mt-24 mx-auto flex flex-col gap-28 mb-40 w-screen">
        <div className="flex flex-col gap-4 items-center justify-center text-center my-20">
          <div className="card_content_loader"></div>
        </div>
      </section>
    );
  }
  if (data?.fetchDisplayCard.data?.card_count === 0) {
    content = (
      <section className="mt-24 mx-auto flex flex-col gap-28 mb-40 w-screen">
        <div className="flex flex-col gap-4 items-center justify-center text-center my-20">
          <h1 className="text-3xl">
            Add words from the <q>Portal</q> page to begin...
          </h1>
        </div>
        <div className="flex flex-row justify-center gap-3 flex-wrap">
          {data.fetchDisplayCard.data?.bins.map(
            (bin: { bin: string; count: number }) => (
              <Bin key={bin.bin} bin={bin.bin} count={bin.count} />
            )
          )}
        </div>
      </section>
    );
  } else {
    if (data.fetchDisplayCard.data?.id === null) {
      content = (
        <section className="mt-24 mx-auto flex flex-col gap-28 mb-40 w-screen">
          <div className="flex flex-col gap-4 items-center justify-center text-center my-20">
            <h1 className="text-3xl">
              You are temporarily done; please come back later to review more
              words.
            </h1>
          </div>
          <div className="flex flex-row justify-center gap-3 flex-wrap">
            {data.fetchDisplayCard.data?.bins.map(
              (bin: { bin: string; count: number }) => (
                <Bin key={bin.bin} bin={bin.bin} count={bin.count} />
              )
            )}
          </div>
        </section>
      );
    } else if (data.fetchDisplayCard.data?.are_cards_done) {
      content = (
        <section className="mt-24 mx-auto flex flex-col gap-28 mb-40 w-screen">
          <div className="flex flex-col gap-4 items-center justify-center text-center my-20">
            <h1 className="text-3xl">
              You have no more words to review; you are permanently done!
            </h1>
          </div>
          <div className="flex flex-row justify-center gap-3 flex-wrap">
            {data.fetchDisplayCard.data?.bins.map(
              (bin: { bin: string; count: number }) => (
                <Bin key={bin.bin} bin={bin.bin} count={bin.count} />
              )
            )}
          </div>
        </section>
      );
    } else {
      content = (
        <section className="mt-10 mx-auto flex flex-col gap-28 mb-40 w-screen">
          <div className="flex flex-col gap-4 items-center">
            <Card
              word={data.fetchDisplayCard.data?.word}
              definition={data.fetchDisplayCard.data?.definition}
            />
            <div className="flex flex-row justify-between px-5 w-full md:px-0 md:w-[450px]">
              <Button
                disable={loadingMutation}
                type={ButtonTypes.wrong}
                answerCard={() => {
                  answerCardFunction(
                    false,
                    data.fetchDisplayCard.data?.id,
                    data.fetchDisplayCard.data?.bin
                  );
                  setIsCardCorrect(false);
                }}
              />
              <Button
                disable={loadingMutation}
                type={ButtonTypes.correct}
                answerCard={() => {
                  answerCardFunction(
                    true,
                    data.fetchDisplayCard.data?.id,
                    data.fetchDisplayCard.data?.bin
                  );
                  setIsCardCorrect(true);
                }}
              />
            </div>
          </div>
          <div className="flex flex-row justify-center gap-3 flex-wrap">
            {data.fetchDisplayCard.data?.bins.map(
              (bin: { bin: string; count: number }) => (
                <Bin key={bin.bin} bin={bin.bin} count={bin.count} />
              )
            )}
          </div>
        </section>
      );
    }
  }

  if (error) {
    toast.error(JSON.stringify(error.message));
  }

  return <>{content}</>;
};

export default Cardspage;
