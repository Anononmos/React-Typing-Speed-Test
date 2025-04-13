import { useState, useEffect, memo } from "react";
import { usePrevious } from "../utils";


function Paragraph ({ children }: { children: string }) {
    

    let char = 0;

    

    // Make sure keyUp event listener has access to latest version of text i.e., after Paragraph loads

    return (
        <div className="paper">
            <div className="paragraph">
                {
                    // Split text into words keeping the spaces, then split into letters
                    children.split(/(?<=\s)/).map( (word, i) => (
                        <div className="word" key={i}>
                            {
                                word.split('').map( c => <div id={`letter-${char}`} className="letter" key={char++}>{c}</div>)
                            }
                        </div>
                        )
                    )
                }
            </div>
        </div>
    );
}

export default memo(Paragraph);