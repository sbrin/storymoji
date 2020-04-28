/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateGame = /* GraphQL */ `
  subscription OnCreateGame {
    onCreateGame {
      id
      ownerID
      type
      players {
        items {
          id
          gameID
          playerID
          gameItems
          name
        }
        nextToken
      }
      secret
      dice
    }
  }
`;
export const onUpdateGame = /* GraphQL */ `
  subscription OnUpdateGame {
    onUpdateGame {
      id
      ownerID
      type
      players {
        items {
          id
          gameID
          playerID
          gameItems
          name
        }
        nextToken
      }
      secret
      dice
    }
  }
`;
export const onDeleteGame = /* GraphQL */ `
  subscription OnDeleteGame {
    onDeleteGame {
      id
      ownerID
      type
      players {
        items {
          id
          gameID
          playerID
          gameItems
          name
        }
        nextToken
      }
      secret
      dice
    }
  }
`;
export const onCreateGamePlayer = /* GraphQL */ `
  subscription OnCreateGamePlayer {
    onCreateGamePlayer {
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
      gameItems
      name
    }
  }
`;
export const onUpdateGamePlayer = /* GraphQL */ `
  subscription OnUpdateGamePlayer {
    onUpdateGamePlayer {
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
      gameItems
      name
    }
  }
`;
export const onDeleteGamePlayer = /* GraphQL */ `
  subscription OnDeleteGamePlayer {
    onDeleteGamePlayer {
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
      gameItems
      name
    }
  }
`;
export const onCreatePlayer = /* GraphQL */ `
  subscription OnCreatePlayer {
    onCreatePlayer {
      id
      sessionToken
      name
      games {
        items {
          id
          gameID
          playerID
          gameItems
          name
        }
        nextToken
      }
    }
  }
`;
export const onUpdatePlayer = /* GraphQL */ `
  subscription OnUpdatePlayer {
    onUpdatePlayer {
      id
      sessionToken
      name
      games {
        items {
          id
          gameID
          playerID
          gameItems
          name
        }
        nextToken
      }
    }
  }
`;
export const onDeletePlayer = /* GraphQL */ `
  subscription OnDeletePlayer {
    onDeletePlayer {
      id
      sessionToken
      name
      games {
        items {
          id
          gameID
          playerID
          gameItems
          name
        }
        nextToken
      }
    }
  }
`;
