export type UserType = {
  uid: string;
  displayName: string;
  email: string;
  emailVerified: boolean;
  photoURL: string;
};

export const initState: UserType = {
  uid: '',
  displayName: '',
  email: '',
  emailVerified: false,
  photoURL: '',
};

export const REDUCER_ACTIONS = {
  SET_USER: 'SET_USER',
} as const;

type ActionTypes = keyof typeof REDUCER_ACTIONS;

type ReducerAction = {
  type: ActionTypes;
  payload: UserType;
};

export const reducer = (user: UserType, action: ReducerAction): UserType => {
  switch (action.type) {
    case REDUCER_ACTIONS.SET_USER:
      return { ...user, ...action.payload };

    default:
      return user;
  }
};
