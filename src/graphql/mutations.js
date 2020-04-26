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
export const updateGame = /* GraphQL */ `
  mutation UpdateGame(
    $input: UpdateGameInput!
    $condition: ModelGameConditionInput
  ) {
    updateGame(input: $input, condition: $condition) {
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
export const deleteGame = /* GraphQL */ `
  mutation DeleteGame(
    $input: DeleteGameInput!
    $condition: ModelGameConditionInput
  ) {
    deleteGame(input: $input, condition: $condition) {
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
      playerID
      player {
        id
        sessionToken
        name
        games {
          nextToken
        }
      }
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
      playerID
      player {
        id
        sessionToken
        name
        games {
          nextToken
        }
      }
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
      playerID
      player {
        id
        sessionToken
        name
        games {
          nextToken
        }
      }
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
        }
        nextToken
      }
    }
  }
`;
export const createItem = /* GraphQL */ `
  mutation CreateItem(
    $input: CreateItemInput!
    $condition: ModelItemConditionInput
  ) {
    createItem(input: $input, condition: $condition) {
      id
      gameType
      playerID
      player {
        id
        sessionToken
        name
        games {
          nextToken
        }
      }
      content
      name
    }
  }
`;
export const updateItem = /* GraphQL */ `
  mutation UpdateItem(
    $input: UpdateItemInput!
    $condition: ModelItemConditionInput
  ) {
    updateItem(input: $input, condition: $condition) {
      id
      gameType
      playerID
      player {
        id
        sessionToken
        name
        games {
          nextToken
        }
      }
      content
      name
    }
  }
`;
export const deleteItem = /* GraphQL */ `
  mutation DeleteItem(
    $input: DeleteItemInput!
    $condition: ModelItemConditionInput
  ) {
    deleteItem(input: $input, condition: $condition) {
      id
      gameType
      playerID
      player {
        id
        sessionToken
        name
        games {
          nextToken
        }
      }
      content
      name
    }
  }
`;
