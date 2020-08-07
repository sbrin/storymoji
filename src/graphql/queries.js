/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getGame = /* GraphQL */ `
  query GetGame($id: ID!) {
    getGame(id: $id) {
      id
      ownerID
      type
      players {
        items {
          id
          gameID
          playerID
          playerItems
          name
        }
        nextToken
      }
      secret
      size
      gameItems {
        id
        content
        status
        state
      }
      gameTeams {
        id
        name
        score
        status
      }
      status
      preset
    }
  }
`;
export const listGames = /* GraphQL */ `
  query ListGames(
    $filter: ModelGameFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGames(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        ownerID
        type
        players {
          nextToken
        }
        secret
        size
        gameItems {
          id
          content
          status
          state
        }
        gameTeams {
          id
          name
          score
          status
        }
        status
        preset
      }
      nextToken
    }
  }
`;
export const getPlayer = /* GraphQL */ `
  query GetPlayer($id: ID!) {
    getPlayer(id: $id) {
      id
      sessionToken
      name
      games {
        items {
          id
          gameID
          playerID
          playerItems
          name
        }
        nextToken
      }
    }
  }
`;
export const listPlayers = /* GraphQL */ `
  query ListPlayers(
    $filter: ModelPlayerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPlayers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        sessionToken
        name
        games {
          nextToken
        }
      }
      nextToken
    }
  }
`;
