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
    <div style={{display: "block"}}>

      <div style={{ padding: "1em" }}>
        <h3 style={{margin: 0}}>Instructiones</h3>
        <div>Para es press "d" to start</div><br />

        <strong>Movement optiones:</strong>
        <div>Left: "a"</div>
        <div>Right: "d"</div>
        <div>Up: "w"</div>
        <div>Down: "s"</div><br />

        <div className='text-mute muted cool-grey'>This game is incomplete, but enjoy :)</div>
      </div>

      <div>
        <div>Score: {score}</div>
        <CanvasBoard height={400} width={700} />
      </div>

    </div>
  )
}
