/* Instruments */
import type { ReduxState } from '@/lib/redux'

export const selectScore = (state: ReduxState) => state.game.score
export const selectSnake = (state: ReduxState) => state.game.snake;
export const selectDisallowedDirection = (state: ReduxState) => state.game.disallowedDirection;
