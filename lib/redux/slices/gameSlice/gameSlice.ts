/* Core */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const initialState: GameSliceState = {
  value: 0,
  status: 'idle',
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
})

/* Types */
export interface GameSliceState {
  value: number
  status: 'idle' | 'loading' | 'failed'
}
