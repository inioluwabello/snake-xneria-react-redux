'use client'

/* Core */
import { useState } from 'react'

/* Instruments */
import {
  gameSlice,
  useSelector,
  useDispatch,
  selectScore,
} from '@/lib/redux'
import { CanvasBoard } from './CanvasBoard'

export const Game = () => {
  const dispatch = useDispatch()
  const score = useSelector(selectScore)
  // const [incrementAmount, setIncrementAmount] = useState(2)

  return (
    <div>
      
      <div>Score: {score}</div>
      <CanvasBoard height={400} width={800} />
      <div>
        {/* <button
          aria-label="Decrement value"
          onClick={() => dispatch(gameSlice.actions.decrement())}
        >
          -
        </button>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(gameSlice.actions.increment())}
        >
          +
        </button> */}
      </div>
    </div>
  )
}
