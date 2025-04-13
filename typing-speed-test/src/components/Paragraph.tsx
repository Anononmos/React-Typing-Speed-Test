import { useState, useEffect } from "react";
import { usePrevious } from "../utils";

export default function Paragraph({cursor, children}: {cursor: number, children: string}) {
    const prevCursor = usePrevious<number>(cursor, 0)!;

    let char = 0;

    const charCount = children.length;

    // Add and remove listeners for keyboard press
    useEffect( () => {
        const letters = document.getElementsByClassName("letter");

        letters[cursor].classList.add("current");

        return () => {

        };
    }, []);

    // update cursor
    useEffect( () => {
        // Event listeners for key press responsible for updating cursors

        const letters = document.getElementsByClassName("letter");

        letters[prevCursor].classList.remove("current");
        letters[cursor].classList.add("current");
        
    }, [cursor]);

    return (
        <div className="paper">
            <div className="paragraph">
                {
                    // Split text into words keeping the spaces, then split into letters
                    children.split(/(?<=\s)/).map( (word, i) => (
                        <div className="word" key={i}>
                            {
                                word.split('').map( c => <div className="letter" key={char++}>{c}</div>)
                            }
                        </div>
                        )
                    )
                }
            </div>
        </div>
    );
}