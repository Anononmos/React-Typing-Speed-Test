import { useState, useEffect, useRef } from "react";
import { usePrevious, useKeyPress } from "../hooks";
import Character from "./Character";

type Timer = NodeJS.Timer | null;

export default function Paragraph ({ children }: { children: string }) {
    const [position, setPosition] = useState(0);       // Current position
    const [lastTyped, setlastTyped] = useState("");     // Last typed key
    const [seconds, setSeconds] = useState(0);

    const [toType, setToType] = useState<string[]> ([]);

    const prevPosition = usePrevious<number>(position, 0);

    // Does not matter what character was typed unless it is correct

    const timer = useRef<Timer>(null);

    let char = 0;
    const endIndex = children.length - 1;

    // Initialize characters to type
    useEffect( () => {
        const chars = children.split("");
        setToType(chars);
    }, []);

    useKeyPress(key => {
        if (key !== "Backspace") {
            setPosition(oldPosition => (oldPosition < endIndex) ? oldPosition + 1 : oldPosition);
        }

        if (key === "Backspace") {
            setPosition(oldPosition => (oldPosition > 0) ? oldPosition - 1 : oldPosition);
        }

        setlastTyped(key);
    });

    // start timer after first character is typed
    if (timer.current === null && lastTyped !== "") {
        // Start timer
        const start = Date.now();

        timer.current = setInterval( () => {
            const delta = Date.now() - start;   // Elapsed time in ms

            setSeconds(delta / 1000);
        }, 100);    // Update every 100 ms 
    }

    // End timer upon reaching end
    if (timer.current && position >= toType.length) {
        clearInterval(timer.current);

        timer.current = null;
    }

    return (
        <div className="paper">
            <div className="paragraph">
                {
                    // Split text into words keeping the spaces, then split into letters
                    children.split(/(?<=\s)/).map( (word, i) => (
                        <div className="word" key={i}>
                            {
                                word.split('').map( c => 
                                    <Character value={c} id={char++} typed={lastTyped} position={position} />
                                )
                            }
                        </div>
                        )
                    )
                }
            </div>
        </div>
    );
}