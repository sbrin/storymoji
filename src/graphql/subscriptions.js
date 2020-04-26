/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateGame = /* GraphQL */ `
  subscription OnCreateGame {
    onCreateGame {
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
export const onUpdateGame = /* GraphQL */ `
  subscription OnUpdateGame {
    onUpdateGame {
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
export const onDeleteGame = /* GraphQL */ `
  subscription OnDeleteGame {
    onDeleteGame {
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
export const onCreateGamePlayer = /* GraphQL */ `
  subscription OnCreateGamePlayer {
    onCreateGamePlayer {
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
export const onUpdateGamePlayer = /* GraphQL */ `
  subscription OnUpdateGamePlayer {
    onUpdateGamePlayer {
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
export const onDeleteGamePlayer = /* GraphQL */ `
  subscription OnDeleteGamePlayer {
    onDeleteGamePlayer {
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
        }
        nextToken
      }
    }
  }
`;
export const onCreateItem = /* GraphQL */ `
  subscription OnCreateItem {
    onCreateItem {
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
export const onUpdateItem = /* GraphQL */ `
  subscription OnUpdateItem {
    onUpdateItem {
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
export const onDeleteItem = /* GraphQL */ `
  subscription OnDeleteItem {
    onDeleteItem {
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
