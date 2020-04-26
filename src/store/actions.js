import * as queries from "@/graphql/queries";
import * as mutations from "@/graphql/mutations";
import * as subscriptions from "@/graphql/subscriptions";
import client from "../graphql/client";
import gql from "graphql-tag";

const actions = {};

for (const mutation in mutations) {
  actions[mutation] = input => client.mutate({
    mutation: gql(mutations[mutation]),
    variables: {
      input
    }
  });

}

for (const query in queries) {
  actions[query] = (input) => client.query({
    query: gql(queries[query]),
    variables: {
      ...input
    },
    fetchPolicy: 'network-only',
  });
}

for (const subscription in subscriptions) {
  actions[subscription] = () => client.subscribe({
    query: gql(subscriptions[subscription]),
  });
}

export default actions;
// createGame
// updateGame
// deleteGame
// createGamePlayer
// updateGamePlayer
// deleteGamePlayer
// createPlayer
// updatePlayer
// deletePlayer
// createItem
// updateItem
// deleteItem

// getGame
// listGames
// getPlayer
// listPlayers

// onCreateGame
// onUpdateGame
// onDeleteGame
// onCreateGamePlayer
// onUpdateGamePlayer
// onDeleteGamePlayer
// onCreatePlayer
// onUpdatePlayer
// onDeletePlayer
// onCreateItem
// onUpdateItem
// onDeleteItem
