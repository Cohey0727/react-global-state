import { useCallback } from "react";
import { useUser } from "../states";

const Apple: React.FC = () => {
  const [user, setUser] = useUser();
  const changeUserName = useCallback(
    (name: string) => {
      setUser((prev) => ({ ...prev, name }));
    },
    [setUser]
  );
  return (
    <div>
      {user.name}
      <input onChange={(e) => changeUserName(e.target.value)} />
    </div>
  );
};

export default Apple;
