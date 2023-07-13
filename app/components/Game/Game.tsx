'use client'

/* Core */
import { useState } from 'react'

/* Instruments */
import {
  gameSlice,
  useSelector,
  useDispatch,
  selectGame,
} from '@/lib/redux'

export const Game = () => {
  const dispatch = useDispatch()
  const game = useSelector(selectGame)
  const [incrementAmount, setIncrementAmount] = useState(2)

  return (
    <div>
      <div>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(gameSlice.actions.decrement())}
        >
          -
        </button>
        <span>{game.value}</span>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(gameSlice.actions.increment())}
        >
          +
        </button>
      </div>
      <div>
        <input
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(Number(e.target.value ?? 0))}
        />
        <button
          onClick={() =>
            dispatch(gameSlice.actions.incrementByAmount(incrementAmount))
          }
        >
          Add Amount
        </button>
      </div>
    </div>
  )
}
