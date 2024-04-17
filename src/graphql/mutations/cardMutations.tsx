import { gql } from "@apollo/client";

const ANSWER_CARD = gql`
  mutation AnswerCard($isCorrect: Boolean!, $cardId: Int!, $bin: Int!) {
    answerCard(isCorrect: $isCorrect, card_id: $cardId, bin: $bin) {
      status
      message
      data {
        id
        word
        definition
        bins {
          bin
          count
        }
      }
    }
  }
`;

const CREATE_CARD = gql`
  mutation CreateCard($data: newCardInput!) {
    createCard(data: $data) {
      status
      message
      data {
        id
        word
        definition
        bin
        time_to_appear
        wrongly_answered_count
        user_id
        created_at
        updated_at
      }
    }
  }
`;

const EDIT_CARD = gql`
  mutation EditCard($data: editCardInput!, $cardId: Int!) {
    editCard(data: $data, card_id: $cardId) {
      status
      message
      data {
        id
        word
        definition
        bin
        time_to_appear
        wrongly_answered_count
        user_id
        created_at
        updated_at
      }
    }
  }
`;

const DELETE_CARD = gql`
  mutation DeleteCard($cardId: Int!) {
    deleteCard(card_id: $cardId) {
      status
      message
      data {
        id
        word
        definition
        bin
        time_to_appear
        wrongly_answered_count
        user_id
        created_at
        updated_at
      }
    }
  }
`;

const cardMutations = {
  ANSWER_CARD,
  CREATE_CARD,
  EDIT_CARD,
  DELETE_CARD,
};

export default cardMutations;
