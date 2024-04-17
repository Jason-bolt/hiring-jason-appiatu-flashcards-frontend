import React, { useEffect, useState } from "react";
import EditCardModal from "../components/EditCardModal";
import { BiPlus } from "react-icons/bi";
import AddCardModal from "../components/AddCardModal";
import { useForm } from "react-hook-form";
import ProfileCard from "../components/ProfileCard";
import useAuth from "../hooks/useAuth";
import { useMutation, useQuery } from "@apollo/client";
import cardMutations from "../graphql/mutations/cardMutations";
import cardQueries from "../graphql/queries/cardQueries";
import toast from "react-hot-toast";

const { CREATE_CARD, EDIT_CARD, DELETE_CARD } = cardMutations;
const { FETCH_USER_CARDS } = cardQueries;

const Portalpage = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const { userData } = useAuth();
  const { loading, data, refetch } = useQuery(FETCH_USER_CARDS);
  const [createCard, { loading: createCardLoading, data: addCardData }] =
    useMutation(CREATE_CARD);
  const [editCard, { loading: editCardLoading, data: editCardData }] =
    useMutation(EDIT_CARD);
  const [deleteCard, { data: deleteCardData }] = useMutation(DELETE_CARD);
  const [selectedCardId, setSelectedCardId] = useState(0);
  const [editCardWord, setEditCardWord] = useState("");
  const [editCardDefinition, setEditCardDefinition] = useState("");

  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      search: "",
    },
  });

  function toggleEditModal() {
    setShowEditModal(!showEditModal);
  }

  function toggleAddModal() {
    setShowAddModal(!showAddModal);
  }

  function submitAddCard(data: { word: string; definition: string }) {
    createCard({
      variables: {
        data,
      },
    });
  }

  function submitDeleteCard(cardId: number) {
    deleteCard({
      variables: {
        cardId,
      },
    });
  }

  useEffect(() => {
    refetch();
  });

  useEffect(() => {
    refetch({
      data: watch(),
    });
  }, [watch()]);

  useEffect(() => {
    if (addCardData?.createCard.status === "201") {
      setTimeout(function () {
        setShowAddModal(false);
      }, 500);
      toast.success("Card created!");
      refetch();
    }

    if (addCardData?.createCard.status === "400") {
      toast.error(addCardData?.createCard.message);
    }
  }, [addCardData]);

  useEffect(() => {
    if (editCardData?.editCard.status === "200") {
      setTimeout(function () {
        setShowEditModal(false);
      }, 500);
      toast.success("Card edited!");
      refetch();
    }

    if (editCardData?.editCard.status === "400") {
      toast.error(editCardData?.editCard.message);
    }
  }, [editCardData]);

  useEffect(() => {
    if (deleteCardData?.deleteCard.status === "200") {
      toast.success("Card deleted!");
      refetch();
    }

    if (deleteCardData?.deleteCard.status === "400") {
      toast.error(deleteCardData?.deleteCard.message);
    }
  }, [deleteCardData]);

  function submitEditCard(data: {
    word: string;
    definition: string;
    cardId: number;
  }) {
    editCard({
      variables: {
        data: {
          word: data.word,
          definition: data.definition,
        },
        cardId: data.cardId,
      },
    });
  }

  let content: React.JSX.Element;
  if (loading) {
    content = (
      <section className="flex justify-center items-center text-center mt-16">
        <div className="card_content_loader"></div>
      </section>
    );
  } else {
    if (data?.fetchUserCards?.data.length === 0) {
      content = (
        <section className="flex justify-center items-center text-center mt-16">
          <h1 className="text-xl">You have no cards available...</h1>
        </section>
      );
    } else {
      content = data?.fetchUserCards.data.map(
        (card: {
          id: number;
          word: string;
          definition: string;
          bin: string;
          time_to_appear: string;
          wrongly_answered_count: number;
          created_at: string;
        }) => (
          <ProfileCard
            key={card.id}
            cardId={card.id}
            word={card.word}
            definition={card.definition}
            bin={card.bin}
            time_to_appear={new Date(card.time_to_appear)}
            wrongly_answered_count={card.wrongly_answered_count}
            toggleEditModal={() => {
              toggleEditModal();
              setSelectedCardId(card.id);
              setEditCardWord(card.word);
              setEditCardDefinition(card.definition);
            }}
            deleteCard={submitDeleteCard}
          />
        )
      );
    }
  }

  return (
    <>
      <section className="mt-10 mx-auto flex flex-col items-center gap-5 mb-40 w-screen">
        <div className="flex flex-col justify-center items-center gap-5">
          <p className="font-thin">
            <span className="font-semibold">Username: </span>{" "}
            {userData?.username}
          </p>
          {/* <button className="bg-black text-white px-3 py-1 rounded-md flex items-center gap-2 hover:cursor-pointer">
            Change password
            <BiSolidEditAlt />
          </button> */}
        </div>

        {/* Add new card */}
        <button
          className="border border-black text-black bg-white text-sm rounded px-3 py-1 my-10 flex flex-row items-center hover:cursor-pointer"
          onClick={toggleAddModal}
        >
          Add new card &nbsp;
          <BiPlus />
        </button>
        {/* Add card modal */}
        {showAddModal && (
          <AddCardModal
            toggleAddModal={toggleAddModal}
            submitAddCard={submitAddCard}
            loading={createCardLoading}
          />
        )}

        <form
          onSubmit={handleSubmit((data) => {
            refetch({
              data,
            });
          })}
          className="w-11/12 md:w-3/5 lg:w-2/5 xl:1/5"
        >
          <input
            type="text"
            {...register("search")}
            className="border rounded-md py-2 w-full px-3 placeholder:text-gray-300"
            placeholder="Search by word..."
            name="search"
          />
        </form>

        {/* Cards */}
        <div className="flex justify-center flex-row flex-wrap gap-3 px-5 w-full md:px-0">
          {content}
        </div>
      </section>

      {showEditModal && (
        <EditCardModal
          toggleEditModal={toggleEditModal}
          cardId={selectedCardId}
          word={editCardWord}
          definition={editCardDefinition}
          submitEditCard={submitEditCard}
          loading={editCardLoading}
        />
      )}
    </>
  );
};

export default Portalpage;
