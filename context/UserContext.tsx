import * as React from "react";
import { Dispatch, SetStateAction, useState, useEffect } from "react";
import { GET_USER } from "queries";
import { useLazyQuery } from "@apollo/client";
import useLocalStorage from "hooks/useLocalStorage";
import { USER_STATES } from "utils/constants";
import { useRouter } from "next/router";

type User = {
  id?: String;
  username?: String;
  profilePicture?: String;
  email?: String;
  lastname?: String;
  name?: String;
  confirmed?: Boolean;
};

type ProviderProps = {
  children: React.ReactNode | React.ReactNode[] | null;
};

interface ContextInterface {
  user: User | undefined;
  userId: "";
  setUserId: Dispatch<SetStateAction<String>>;
  setUser: (user: User) => void;
  setToken: (authToken: String) => void;
  token: String;
  loading: Boolean;
  logout: () => void;
  redirect: (url: string, as?: string) => void;
  url: string;
  userStatus: undefined | false | true;
}

export const UserContext = React.createContext<ContextInterface>({
  user: {},
  userId: "",
  setUserId: undefined,
  setUser: undefined,
  setToken: undefined,
  token: "",
  loading: true,
  logout: undefined,
  redirect: undefined,
  url: "",
  userStatus: USER_STATES.NOT_KNOWN,
});

export function UserProvider({
  children,
}: {
  children: React.ReactNode | React.ReactNode[] | null;
  value?: ContextInterface;
}) {
  const router = useRouter();
  const [token, setToken] = useLocalStorage("token", "");
  const [userId, setUserId] = useLocalStorage("user-id", "");
  const [getUser, { data }] = useLazyQuery(GET_USER);
  const [user, setUser] = useState<User>(undefined);
  const [userStatus, setUserStatus] = useState(USER_STATES.NOT_KNOWN);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (user === undefined) {
      setLoading(true);
      if (token && userId) {
        getUser({ variables: { id: userId } });
        if (data) {
          setUser(data.getUserById);
          setUserStatus(USER_STATES.LOGGED_IN);
        }
      } else {
        setUserStatus(USER_STATES.LOGGED_OUT);
      }
    } else {
      if (!token || !userId) {
        setUserStatus(USER_STATES.LOGGED_OUT);
      }
      if (user && user["name"]) {
        setUserStatus(USER_STATES.LOGGED_IN);
      }
    }
    setLoading(false);
  }, [data, userId, token]);

  const modifyUser: (user: User) => void = function (user: User): void {
    setUser(user);
    if (user?.id) {
      setUserId(user.id);
    }
  };

  const modifyToken: (authToken: String) => void = function (
    authToken: String
  ): void {
    setToken(authToken);
  };

  const redirect: (redirection: string, as?: string) => void = function (
    redirection: string,
    as?: string
  ): void {
    if (userStatus === USER_STATES.LOGGED_OUT) {
      setUrl(redirection);
      router.push("/login");
    }
  };

  const logout = () => {
    setUser({});
    setToken("");
    setUserId("");
    setUserStatus(USER_STATES.LOGGED_OUT);
    router.push("/");
  };

  const ContextValue = {
    user: user,
    token: token,
    setUser: modifyUser,
    setToken: modifyToken,
    userId: userId,
    setUserId: setUserId,
    redirect,
    url,
    loading,
    logout,
    userStatus,
  };

  return (
    <UserContext.Provider value={ContextValue}>{children}</UserContext.Provider>
  );
}
