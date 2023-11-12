import { createUseGlobalState } from "./core";

type User = {
  name: string;
  age: number;
  email: string;
};

const useUser = createUseGlobalState<User>({
  name: "John Doe",
  age: 20,
  email: "example@example.com",
});

export type { User };
export { useUser };
