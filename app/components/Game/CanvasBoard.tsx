import {
    selectSnake, useDispatch, gameSlice,
    MOVE_RIGHT, MOVE_LEFT, MOVE_UP, MOVE_DOWN, selectDisallowedDirection
} from "@/lib/redux";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { IObjectBody, clearBoard, drawObject, generateRandomPosition } from "./Utilities";

export interface ICanvasBoard {
    height: number;
    width: number;
}

export const CanvasBoard = ({ height, width }: ICanvasBoard) => {

    const dispatch = useDispatch();
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
    const snake1 = useSelector(selectSnake);
    const disallowedDirection = useSelector(selectDisallowedDirection);
    const [pos, setPos] = useState<IObjectBody>(
        generateRandomPosition(width - 20, height - 20)
    );
    let intervalHandle: any;
    
    const [isConsumed, setIsConsumed] = useState<boolean>(false);

    useEffect(() => {
        setContext(canvasRef.current && canvasRef.current.getContext("2d"));
        drawObject(context, snake1, "#91C483"); //Draws snake at the required position
        drawObject(context, [pos], "#676FA3"); //Draws fruit randomly
    }, [context]);

    useEffect(() => {
        if (isConsumed) {
            const posi = generateRandomPosition(width - 20, height - 20);
            setPos(posi);
            setIsConsumed(false);

            dispatch(gameSlice.actions.increaseSnake());
            dispatch(gameSlice.actions.increment());
        }
    }, [isConsumed, pos, height, width, dispatch]);

    const moveSnake = useCallback(
        (dx = 0, dy = 0, ds: string) => {
            let newMove = false;
            if (dx > 0 && dy === 0 && ds !== MOVE_RIGHT) {
                ds = MOVE_LEFT
                dispatch(gameSlice.actions.setDisDirection(ds))
                dispatch(gameSlice.actions.makeMove({ dx, dy, move: MOVE_RIGHT }));
                newMove = true;
            }

            if (dx < 0 && dy === 0 && ds !== MOVE_LEFT) {
                ds = MOVE_RIGHT
                dispatch(gameSlice.actions.setDisDirection(ds))
                dispatch(gameSlice.actions.makeMove({ dx, dy, move: MOVE_LEFT }));
                newMove = true;
            }

            if (dx === 0 && dy < 0 && ds !== MOVE_UP) {
                ds = MOVE_DOWN
                dispatch(gameSlice.actions.setDisDirection(ds))
                dispatch(gameSlice.actions.makeMove({ dx, dy, move: MOVE_UP }));
                newMove = true;
            }

            if (dx === 0 && dy > 0 && ds !== MOVE_DOWN) {
                ds = MOVE_UP
                dispatch(gameSlice.actions.setDisDirection(ds))
                dispatch(gameSlice.actions.makeMove({ dx, dy, move: MOVE_DOWN }));
                newMove = true;
            }

            if (newMove) {
                window.clearInterval(intervalHandle);
                intervalHandle = setTimeout(() => {
                    moveSnake(dx, dy, ds)
                }, 500);
            }

        },
        [dispatch]
    );

    const handleKeyEvents = useCallback(
        (event: KeyboardEvent) => {

            if (disallowedDirection) {
                switch (event.key) {
                    case "w":
                        moveSnake(0, -20, disallowedDirection);
                        break;
                    case "s":
                        moveSnake(0, 20, disallowedDirection);
                        break;
                    case "a":
                        moveSnake(-20, 0, disallowedDirection);
                        break;
                    case "d":
                        event.preventDefault();
                        moveSnake(20, 0, disallowedDirection);
                        break;
                }
            } else {
                if (
                    disallowedDirection !== MOVE_LEFT &&
                    disallowedDirection !== MOVE_UP &&
                    disallowedDirection !== MOVE_DOWN &&
                    event.key === "d"
                )
                    moveSnake(20, 0, disallowedDirection); //Move RIGHT at start
            }
        },
        [disallowedDirection, moveSnake]
    );

    useEffect(() => {
        setContext(canvasRef.current && canvasRef.current.getContext("2d"));
        clearBoard(context);
        drawObject(context, snake1, "#91C483");
        drawObject(context, [pos], "#676FA3");

        if (snake1[0].x === pos?.x && snake1[0].y === pos?.y) {
            setIsConsumed(true);
        }
    }, [context, snake1]);

    useEffect(() => {
        window.addEventListener("keypress", handleKeyEvents);

        return () => {
            window.removeEventListener("keypress", handleKeyEvents);
        };
    }, [disallowedDirection, handleKeyEvents]);

    return (
        <>
            <canvas
                ref={canvasRef}
                style={{
                    border: "3px solid black",
                }}
                height={height}
                width={width}
            />
        </>
    );
};

export const hasSnakeCollided = (
    snake: IObjectBody[],
    currentHeadPos: IObjectBody
  ) => {
    let flag = false;
    snake.forEach((pos: IObjectBody, index: number) => {
      if (
        pos.x === currentHeadPos.x &&
        pos.y === currentHeadPos.y &&
        index !== 0
      ) {
        flag = true;
      }
    });
  
    return flag;
  };