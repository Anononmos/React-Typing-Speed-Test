import { useEffect, useRef } from "react";

export function usePrevious<Type>(value: Type, initialValue?: Type | null) {
    const ref = useRef<Type | null>(initialValue);

    useEffect( () => {
        ref.current = value;
    });

    return ref.current;
}