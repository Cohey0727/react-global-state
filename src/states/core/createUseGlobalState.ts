import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useReducer,
} from "react";

/**
 * グローバルな状態管理フックを作成する関数。
 *
 * この関数は、コンポーネント間で共有されるグローバルな状態を管理するためのカスタムReactフックを作成します。
 * グローバルな状態は、提供された初期値で初期化されます。
 *
 * @template T グローバル状態に保存される値の型。
 * @param initialState グローバル状態の初期値。
 * @returns グローバル状態にアクセスし、更新するためのカスタムフック[useGlobalState]を返します。
 */
function createUseGlobalState<T>(initialState: T) {
  const subscribers = new Set<() => void>();
  const globalValueHolder: { state: T } = { state: initialState };

  const useGlobalState = () => {
    // 際レンダリングの管理
    const [, trigger] = useReducer((prev: number) => prev + 1, 0);
    useEffect(() => {
      subscribers.add(trigger);
      return () => {
        subscribers.delete(trigger);
      };
    }, []);

    // 状態の更新関数
    const setGlobalValue = useCallback<Dispatch<SetStateAction<T>>>(
      (newState: T | ((prevState: T) => T)) => {
        const newStateValue = isSetStateAction(newState)
          ? newState(globalValueHolder.state)
          : newState;
        globalValueHolder.state = newStateValue;
        subscribers.forEach((subscriber) => subscriber());
      },
      []
    );

    return [globalValueHolder.state, setGlobalValue] as const;
  };

  return useGlobalState;
}

const isSetStateAction = <T>(
  value: SetStateAction<T>
): value is (prevState: T) => T => {
  return typeof value === "function";
};

export default createUseGlobalState;
