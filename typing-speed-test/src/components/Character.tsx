import { memo } from "react";

interface CharacterProps {
    id: number, 
    value: string,
    typed: string,
    position: number
}

function Character({id, value, typed, position}: CharacterProps) {

    const className = () => {
        // Handle backspace

        if (id === position) {
            return "current";
        }

        if (value === typed && id < position) {
            return "correct";
        }

        if (value !== typed && typed !== "Backspace" && id < position) {
            return "incorrect";
        }

        if (typed === "Backspace" && id === position - 1) {

            // Get class name of letter before cursor for correcting backspace
            const className = document.getElementById(`letter-${id}`)?.classList[1];

            return className;
        }

        return "";
    };

    return (
        <div className={`letter ${className()}`} id={`letter-${id}`} key={id}>
            {value}
        </div>
    );
}

// Boost performance by only rendering one character around the cursor

export default memo(Character, (props, nextProps) => {
    const { id } = props;
    const { position } = nextProps;

    // Return true to avoid re-render, false to re-render

    return (id < position - 1 || id > position + 1);
});

// export default Character;