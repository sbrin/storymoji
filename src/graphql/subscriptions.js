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
          playerItems
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
          playerItems
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
          playerItems
          name
        }
        nextToken
      }
    }
  }
`;
