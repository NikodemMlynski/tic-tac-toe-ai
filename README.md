# Tic Tac Toe AI (React Native + Expo)

This is a simple mobile implementation of the classic **Tic Tac Toe** game, developed using **React Native**, **Expo**, and styled with **NativeWind**. The game supports human vs AI gameplay with an AI agent powered by the **Minimax algorithm**.

---

## 🎮 Game Features

- Play as **X** or **O**
- Intelligent AI opponent using **Minimax** for optimal decisions
- Displays current turn and endgame status (win/draw)
- Option to restart the game at any time

---

## 🤖 AI Implementation (Minimax Algorithm)

The AI logic is implemented using the **Minimax algorithm**, which evaluates all possible future moves and chooses the optimal one for the AI ("agent") player.

### Key Components:

- **`minimax(board, maximizing)`**: Recursive function to evaluate the best possible move.
  - Returns the move with the best score depending on whether it's maximizing (X) or minimizing (O) it depends if player chose to be X or O.
- **`availableActions(board)`**: Finds all empty cells on the board.
- **`makeMove(board, action, player)`**: Returns a new board state after a move.
- **`checkWinner(board)`**: Determines if there's a winner.
- **`isTerminal(board)`**: Checks for terminal states (win or draw).
- **`utility(board)`**: Assigns numerical values to terminal outcomes (`+1` for X win, `-1` for O win, `0` for draw).

The AI plays its move during each render cycle using `useEffect`, and a small delay is added for better UX.

---

## 🧩 Game Logic Summary

- The board is a 3x3 array of nullable strings (`"X" | "O" | null`).
- `getCurrentPlayer` determines who's turn it is.
- When it's the AI's turn, it calculates the best move using `minimax`.
- When the game ends (win or draw), a modal pops up with the result and a reset option.

---

## 💡 Tech Stack

- **Expo** – for fast development and cross-platform support
- **React Native** – to build the mobile UI
- **NativeWind** – for Tailwind-like styling in React Native

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/tic-tac-toe-ai.git
cd tic-tac-toe-ai
```

```bash
npm install
# or
yarn install
```

```bash
npx expo start
```
