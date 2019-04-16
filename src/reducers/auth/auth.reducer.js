import initialState from './initial.state';
import { actionsSignIn, actionsUser } from '../../utils/app.constants';

/**
 * Reducer responsible for handling user authentication related information flow
 * @param  {Object} state  Initial State to start 
 * @param  {Object} action Which action to perform
 * @return {Object}        New State 
 */
export default function authReducer(state = initialState, action = {}) {
  switch (action.type) {
    case actionsSignIn.pending:
      return {
        ...state,
        user: null,
        isSignInFailed: false,
        isSignInPending: true,
        isSignInSuccess: false,
      };

    case actionsSignIn.success:
      return {
        ...state,
        user: action.user,
        isSignInFailed: false,
        isSignInSuccess: true,
        isSignInPending: false,
      };

    case actionsSignIn.failed:
      return {
        ...state,
        user: null, 
        isSignInFailed: true,
        isSignInPending: false,
        isSignInSuccess: false,
      };

    case actionsSignIn.signout:
      return {
        ...state,
        user: null,
        isSignInFailed: false,
        isSignInPending: false,
        isSignInSuccess: false,
      };

    case actionsUser.pending:
      return {
        ...state,
        isUserRequestPending: true,
        isUserRequestFailed: false,
        isUserRequestSuccess: false,
      };

    case actionsUser.failed:
      return {
        ...state,
        isUserRequestPending: false,
        isUserRequestFailed: true,
        isUserRequestSuccess: false,
      };

    case actionsUser.update:
      return {
        ...state,
        user: action.user,
        isUserRequestPending: false,
        isUserRequestFailed: false,
        isUserRequestSuccess: true,
      };

    default:
      return state;
  }
}
