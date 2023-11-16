import {
  createContext,
  useReducer,
  ReactElement,
  useCallback,
  useContext,
} from 'react';
import { UserType, REDUCER_ACTIONS, initState, reducer } from '../utils/helper';

const useUserContext = (initState: UserType) => {
  const [user, dispatch] = useReducer(reducer, initState);

  const setUser = useCallback((user: UserType) => {
    dispatch({
      type: REDUCER_ACTIONS.SET_USER,
      payload: { ...user },
    });
  }, []);

  return { user, setUser };
};

type UserContextType = ReturnType<typeof useUserContext>;

type ChildrenType = {
  children?: ReactElement | undefined;
};

const initContextState: UserContextType = {
  user: initState,
  setUser: () => {},
};

export const UserContext = createContext<UserContextType>(initContextState);

export const UserProvider = ({
  children,
  ...initState
}: ChildrenType & UserType): ReactElement => {
  return (
    <UserContext.Provider value={useUserContext(initState)}>
      {children}
    </UserContext.Provider>
  );
};

export const UserData = () => useContext(UserContext);
