import { useState, useEffect, useRef, DependencyList } from "react";

export function usePrevious<Type>(value: Type, initialValue?: Type | null) {
    const ref = useRef<Type | null>(initialValue);

    useEffect( () => {
        ref.current = value;
    });

    return ref.current;
}

export function useKeyPress(callback: (_key: string) => void) {
    const [keyPressed, setKeyPressed] = useState<string | null>();

    // Add keyboard event listeners when loaded
    useEffect( () => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const { key } = event;

            // Prevent space from scrolling the page
            if (key === " " && event.target == document.body) {
                event.preventDefault();
            }

            // Filter out control keys except backspace
            if (key.length === 1 || key === "Backspace") {
                setKeyPressed(key);

                callback && callback(key);
            }
        };

        const handleKeyUp = () => {
            setKeyPressed(null);
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

    return keyPressed;
}