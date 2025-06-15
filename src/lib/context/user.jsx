import { ID } from "appwrite";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { account } from "../appwrite";

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

export function UserProvider({ children }) {
  const [current, setCurrent] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchAccount = async () => {
    const me = await account.get();
    setCurrent(me);
  };

  async function login(email, password) {
    await account.createEmailPasswordSession(email, password);
    await fetchAccount();
    navigate("/dashboard", { replace: true });
  }

  async function register(email, password, name, mobile, age) {
    await account.create(ID.unique(), email, password);

    await account.createEmailPasswordSession(email, password);
    await account.updateName(name);
    await account.updatePrefs({ name, mobile, age: Number(age) });

    await fetchAccount();
    navigate("/dashboard", { replace: true });
  }

  async function logout() {
    await account.deleteSession("current");
    setCurrent(null);
    navigate("/", { replace: true });
  }

  useEffect(() => {
    (async () => {
      try {
        await fetchAccount();
      } catch {
        setCurrent(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <UserContext.Provider value={{ current, loading, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
}
