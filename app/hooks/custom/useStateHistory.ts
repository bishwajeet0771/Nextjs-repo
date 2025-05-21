/* eslint-disable no-unused-vars */
import { useCallback, useMemo, useState } from "react";

export interface UseStateHistoryHandlers<T> {
  set: (value: T) => void;
  back: (steps?: number) => void;
  forward: (steps?: number) => void;
  clear: () => void;
}

export interface StateHistory<T> {
  history: T[];
  current: number;
}

export function useStateHistory<T>(): [
  T,
  UseStateHistoryHandlers<T>,
  StateHistory<T>
] {
  const [state, setState] = useState<StateHistory<T>>({
    history: [],
    current: 0,
  });

  const set = useCallback(
    (val: T) =>
      setState((currentState) => {
        const nextHistory = [
          ...currentState.history.slice(0, currentState.current + 1),
          val,
        ];
        const nextState = {
          history: nextHistory.length > 5 ? nextHistory.slice(-5) : nextHistory,
          current: nextHistory.length - 1,
        };
        return nextState;
      }),
    []
  );

  const back = useCallback(
    (steps = 1) =>
      setState((currentState) => ({
        history: currentState.history,
        current: Math.max(0, currentState.current - steps),
      })),
    []
  );

  const forward = useCallback(
    (steps = 1) =>
      setState((currentState) => ({
        history: currentState.history,
        current: Math.min(
          currentState.history.length - 1,
          currentState.current + steps
        ),
      })),
    []
  );
  const clear = useCallback(() => setState({ history: [], current: 0 }), []); // Added clear function

  const handlers = useMemo(
    () => ({ set, forward, back, clear }),
    [set, forward, back, clear]
  );

  return [state.history[state.current], handlers, state];
}
