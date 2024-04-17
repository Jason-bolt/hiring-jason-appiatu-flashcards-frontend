import { gql } from "@apollo/client";

const FETCH_DISPLAY_CARD = gql`
  query FetchDisplayCard {
    fetchDisplayCard {
      status
      message
      data {
        id
        word
        definition
        bin
        are_cards_done
        card_count
        bins {
          bin
          count
        }
      }
    }
  }
`;

const FETCH_USER_CARDS = gql`
  query FetchUserCards($data: searchFilterCardInput) {
  fetchUserCards(data: $data) {
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

const cardQueries = {
    FETCH_DISPLAY_CARD,
    FETCH_USER_CARDS
}

export default cardQueries;