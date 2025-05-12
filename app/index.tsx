import {Alert, Text, TouchableOpacity, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useEffect, useState} from "react";
const EMPTY = null;
import reload from "@/assets/images/reload.png"
import {Image} from "expo-image";
type Board = Array<Array<string | null>>;
type Player = "X" | "O";
type Action = [number, number];
interface MinimaxResult {
  score: number;
  move: Action | null;
}

const initialize_state = () => {
  return [
      [EMPTY, EMPTY, EMPTY],
      [EMPTY, EMPTY, EMPTY],
      [EMPTY, EMPTY, EMPTY]
  ]
}

const getCurrentPlayer = (board: Board): Player => {
  const flat = board.flat();
  const xCount = flat.filter(cell => cell === "X").length;
  const oCount = flat.filter(cell => cell === "O").length;
  return xCount <= oCount ? "X" : "O";
}

const availableActions = (board: Board): Action[] => {
  const moves: Action[] = [];
  board.forEach((row, i) =>
      row.forEach((cell, j) => {
        if (cell === EMPTY) moves.push([i, j]);
      })
  )
  return moves;
}

const makeMove = (board: Board, action: Action, player: Player): Board => {
  const newBoard = board.map(row => [...row]);
  const [i, j] = action;
  if (newBoard[i][j] !== EMPTY) return board;
  newBoard[i][j] = player;
  return newBoard
}

const checkWinner = (board: Board): Player | null => {
  for (let i = 0; i < 3; i++) {
    if (board[i][0] && board[i][0] === board[i][1] && board[i][1] === board[i][2])
      return board[i][0] as Player;
    if (board[0][i] && board[0][i] === board[1][i] && board[1][i] === board[2][i])
      return board[0][i] as Player;
  }
  if (board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2])
    return board[0][0] as Player;
  if (board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0])
    return board[0][2] as Player;
  return null;
};

const isTerminal = (board: Board): boolean => {
  return checkWinner(board) !== null || availableActions(board).length === 0;
}

const utility = (board: Board): number => {
  const w = checkWinner(board);
  if (w === "X") return 1;
  if (w === "O") return -1;
  return 0;
}

const minimax = (board: Board, maximizing: boolean): MinimaxResult => {
  if (isTerminal(board)) return {score: utility(board), move: null};

  const current = maximizing ? "X" : "O";
  const best: MinimaxResult = maximizing ? {score: -Infinity, move: null} : {score: Infinity, move: null};

  for (const action of availableActions(board)) {
    const newBoard = makeMove(board, action, current);
    const result = minimax(newBoard, !maximizing);

    if (maximizing && result.score > best.score) {
      best.score = result.score;
      best.move = action;
    }
    if (!maximizing && result.score < best.score) {
      best.score = result.score;
      best.move = action;
    }
  }

  return best;
}

export default function Index() {
  const [board, setBoard] = useState<Board>(initialize_state());
  const [gameOver, setGameOver] = useState(true);
  const [player, setPlayer] = useState<Player>("X");
  const agent = player === "X" ? "O" : "X";
  const [displayedText, setDisplayedText] = useState("Start a game");

  const handlePress = (i: number, j: number) => {
    if (gameOver || board[i][j] !== EMPTY) return;
    const current = getCurrentPlayer(board);
    const newBoard = makeMove(board, [i, j], current);
    setBoard(newBoard);
  }
  useEffect(() => {
    if(gameOver) {
      setDisplayedText("Start a game")
    } else {
      setDisplayedText((getCurrentPlayer(board) as Player) === player ? "Your turn" : "Agent's turn")
    }
  }, [gameOver, player, agent])

  useEffect(() => {
    const play = () => {
      const winner = checkWinner(board);
      if(gameOver) return;
      if (winner || availableActions(board).length === 0) {
        setGameOver(true);
        Alert.alert("Game Over", winner ? `Winner: ${winner}` : "Draw", [
          {
            text: "Play Again",
            onPress: () => resetGame(),
          },
        ]);
        return;
      }

      if (getCurrentPlayer(board) === agent) {
        const {move} = minimax(board, false);
        if (move) {
          const newBoard = makeMove(board, move, agent);
          const timeout = setTimeout(() => {
            setBoard(newBoard)
          }, 500)
          return () => clearTimeout(timeout);
        }
      }
    }
    play()

  }, [board, gameOver, player, agent])


  const resetGame = () => {
    setGameOver(true);
    setBoard(initialize_state());
  }

  const updatePlayer = (player: Player) => {
    setPlayer(player);
  }

  return (
    <SafeAreaView
        className="flex flex-col items-center  h-screen bg-board"
    >
      <View className="flex flex-row justify-around w-full">

      <View className="bg-cell px-10 h-[45px] flex items-center justify-center rounded-xl shadow-2xl my-10">
        <Text className="text-text text-2xl font-bold uppercase w-[121px] text-center">
          {/*{(!gameOver) ? (<><Text>{(getCurrentPlayer(board) as Player) === player ? "Your" : "Agent's"}</Text> turn</>) : "Start a game"}*/}
          {displayedText}
      </Text>
      </View>
        <TouchableOpacity
            className="flex items-center justify-center bg-text w-[40px] h-[40px] rounded-xl my-10 shadow-2xl shadow-text_shadow"
            onPress={resetGame}
        >
          <Image source={reload} style={{width: 30, height: 30}} contentFit={"contain"} />
        </TouchableOpacity>
      </View>

      <View className="flex flex-row justify-around w-full py-4">
        <View className="flex justify-center items-center">
        <Text className="text-text text-3xl">You're <Text className="text-player font-bold">{player}</Text></Text>
        </View>
        <TouchableOpacity
        className="flex items-center justify-center bg-cell w-[50px] h-[50px] rounded-xl shadow-2xl shadow-cell_shadow"
        onPress={() => updatePlayer("O")}>
          <Text  className={`${player === "O" ? "text-player" : "text-agent"} text-4xl font-bold uppercase`}>O</Text>
        </TouchableOpacity>
        <TouchableOpacity
        className="flex items-center justify-center bg-cell w-[50px] h-[50px] rounded-xl shadow-2xl shadow-cell_shadow"
        onPress={() => updatePlayer("X")}>
           <Text  className={`${player === "X" ? "text-player" : "text-agent"} text-4xl font-bold uppercase`}>X</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity className={`flex items-center justify-center bg-text w-[200px] h-[50px] mt-5 rounded-xl shadow-2xl shadow-text_shadow ${!gameOver ? "opacity-15" : "opacity-100"}`}
                          onPress={() => setGameOver(false)}>
          <Text className={`text-cell text-3xl `}>Start</Text>
        </TouchableOpacity>
      </View>

    <View className="flex flex-col gap-5 mt-[80px]">
      {
        board.map((row, i) => (
          <View key={`${i}`} className="flex flex-row gap-5">
            {row.map((cell, j) => (
                <TouchableOpacity
                    key={`${i}-${j}`}
                    className="w-[90px] h-[90px] bg-cell flex justify-center items-center shadow-2xl shadow-cell_shadow rounded-xl"
                    onPress={() => handlePress(i, j)}
                >
                  <Text className={`${player === cell ? "text-player" : "text-agent"} font-bold text-6xl`}>{cell}</Text>
                </TouchableOpacity>
            ))}
          </View>
        ))
      }

    </View>
    </SafeAreaView>
  );
}
