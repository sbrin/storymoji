/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getGame = /* GraphQL */ `
  query GetGame($id: ID!) {
    getGame(id: $id) {
      id
      ownerID
      type
      player {
        id
        sessionToken
        name
        games {
          nextToken
        }
      }
      players {
        items {
          id
          gameID
          playerID
        }
        nextToken
      }
      secret
      items {
        id
        gameType
        playerID
        player {
          id
          sessionToken
          name
        }
        content
        name
      }
      dice
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
        player {
          id
          sessionToken
          name
        }
        players {
          nextToken
        }
        secret
        items {
          id
          gameType
          playerID
          content
          name
        }
        dice
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
