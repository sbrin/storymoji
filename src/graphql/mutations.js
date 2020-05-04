/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createGame = /* GraphQL */ `
  mutation CreateGame(
    $input: CreateGameInput!
    $condition: ModelGameConditionInput
  ) {
    createGame(input: $input, condition: $condition) {
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
      }
      gameTeams {
        id
        name
        score
      }
      status
    }
  }
`;
export const updateGame = /* GraphQL */ `
  mutation UpdateGame(
    $input: UpdateGameInput!
    $condition: ModelGameConditionInput
  ) {
    updateGame(input: $input, condition: $condition) {
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
      }
      gameTeams {
        id
        name
        score
      }
      status
    }
  }
`;
export const deleteGame = /* GraphQL */ `
  mutation DeleteGame(
    $input: DeleteGameInput!
    $condition: ModelGameConditionInput
  ) {
    deleteGame(input: $input, condition: $condition) {
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
      }
      gameTeams {
        id
        name
        score
      }
      status
    }
  }
`;
export const createGamePlayer = /* GraphQL */ `
  mutation CreateGamePlayer(
    $input: CreateGamePlayerInput!
    $condition: ModelGamePlayerConditionInput
  ) {
    createGamePlayer(input: $input, condition: $condition) {
      id
      gameID
      game {
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
        }
        gameTeams {
          id
          name
          score
        }
        status
      }
      playerID
      player {
        id
        sessionToken
        name
        games {
          nextToken
        }
      }
      playerItems
      name
    }
  }
`;
export const updateGamePlayer = /* GraphQL */ `
  mutation UpdateGamePlayer(
    $input: UpdateGamePlayerInput!
    $condition: ModelGamePlayerConditionInput
  ) {
    updateGamePlayer(input: $input, condition: $condition) {
      id
      gameID
      game {
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
        }
        gameTeams {
          id
          name
          score
        }
        status
      }
      playerID
      player {
        id
        sessionToken
        name
        games {
          nextToken
        }
      }
      playerItems
      name
    }
  }
`;
export const deleteGamePlayer = /* GraphQL */ `
  mutation DeleteGamePlayer(
    $input: DeleteGamePlayerInput!
    $condition: ModelGamePlayerConditionInput
  ) {
    deleteGamePlayer(input: $input, condition: $condition) {
      id
      gameID
      game {
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
        }
        gameTeams {
          id
          name
          score
        }
        status
      }
      playerID
      player {
        id
        sessionToken
        name
        games {
          nextToken
        }
      }
      playerItems
      name
    }
  }
`;
export const createPlayer = /* GraphQL */ `
  mutation CreatePlayer(
    $input: CreatePlayerInput!
    $condition: ModelPlayerConditionInput
  ) {
    createPlayer(input: $input, condition: $condition) {
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
export const updatePlayer = /* GraphQL */ `
  mutation UpdatePlayer(
    $input: UpdatePlayerInput!
    $condition: ModelPlayerConditionInput
  ) {
    updatePlayer(input: $input, condition: $condition) {
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
export const deletePlayer = /* GraphQL */ `
  mutation DeletePlayer(
    $input: DeletePlayerInput!
    $condition: ModelPlayerConditionInput
  ) {
    deletePlayer(input: $input, condition: $condition) {
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
