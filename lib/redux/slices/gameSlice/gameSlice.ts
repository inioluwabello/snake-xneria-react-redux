/* Core */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface ISnakeCoord {
  x: number;
  y: number;
}

export interface IGlobalState {
  snake: ISnakeCoord[] | [];
}

export interface IMove {
  dx: number;
  dy: number;
  move: 'MOVE_RIGHT' | 'MOVE_LEFT' | 'MOVE_UP' | 'MOVE_DOWN';
}

export const MOVE_RIGHT = "MOVE_RIGHT";
export const MOVE_LEFT = "MOVE_LEFT";
export const MOVE_UP = "MOVE_UP";
export const MOVE_DOWN = "MOVE_DOWN";

export const RIGHT = "RIGHT";
export const LEFT = "LEFT";
export const UP = "UP";
export const DOWN = "DOWN";

const initialState: GameSliceState = {
  score: 0,
  snake: [
    { x: 580, y: 300 },
    { x: 560, y: 300 },
    { x: 540, y: 300 },
    { x: 520, y: 300 },
    { x: 500, y: 300 },
  ],
  disallowedDirection: "",
  status: 'idle',
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    increment: (state) => {
      state.score += 1
    },
    stopGame: (state) => {
      state.score -= 1
    },
    setDisDirection: (state, action: PayloadAction<string>) => {
      state.disallowedDirection = action.payload
    },
    makeMove: (state, action: PayloadAction<IMove>) => {
      // switch (action.payload.move) {
      //   case MOVE_RIGHT:
      //     state.disallowedDirection = MOVE_LEFT;
      //   case MOVE_LEFT:
      //     state.disallowedDirection = MOVE_RIGHT;
      //   case MOVE_UP:
      //     state.disallowedDirection = MOVE_DOWN;
      //   case MOVE_DOWN:
      //     state.disallowedDirection = MOVE_UP;
      //   default:
      //     state.disallowedDirection = MOVE_LEFT;
      // }

      let newSnake = [...state.snake];
      newSnake = [{
        //New x and y coordinates
        x: state.snake[0].x + action.payload.dx,
        y: state.snake[0].y + action.payload.dy,
      }, ...newSnake];
      newSnake.pop();

      state.snake = newSnake;
    },
    increaseSnake: (state) => {
      const snakeLen = state.snake.length;
      return {
        ...state,
        snake: [
          ...state.snake,
          {
            x: state.snake[snakeLen - 1].x - 20,
            y: state.snake[snakeLen - 1].y - 20,
          },
        ],
      };
    }
  },
})

/* Types */
export interface GameSliceState {
  score: number
  snake: ISnakeCoord[] | []
  status: 'idle' | 'loading' | 'failed',
  disallowedDirection: string;
}
