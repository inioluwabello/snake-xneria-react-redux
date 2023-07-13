/* Instruments */
import { counterSlice, gameSlice } from './slices'

export const reducer = {
  counter: counterSlice.reducer,
  game: gameSlice.reducer
}
