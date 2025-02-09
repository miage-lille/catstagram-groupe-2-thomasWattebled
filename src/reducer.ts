import { Loop, liftState, loop } from 'redux-loop';
import { compose } from 'redux';
import fakeData from './fake-datas.json';
import { Picture } from './types/picture.type';
import { CloseModal, FetchCatsCommit, FetchCatsRequest, FetchCatsRollback, SelectPicture } from './types/actions.type';
import { Cmd } from 'redux-loop';
import { fetchCatsCommit, fetchCatsRequest, fetchCatsRollback } from './actions';
import { cmdFetch } from './commands';
export type State = {
  counter: number,
  pictures: Picture[];
  selectedPicture: Picture | null
}

export const defaultState: State = {
  counter: 3,
  pictures: [],
  selectedPicture: null
}

type Increment = { type: 'INCREMENT' };
type Decrement = { type: 'DECREMENT' };

const increment = (): Increment => ({ type: 'INCREMENT' });
const decrement = (): Decrement => ({ type: 'DECREMENT' });

type Actions =
  | Increment
  | Decrement
  | SelectPicture
  | CloseModal
  | FetchCatsRequest
  | FetchCatsCommit
  | FetchCatsRollback;

  export const reducer = (state: State | undefined, action: Actions): State | Loop<State> => {
    if (!state) return defaultState;
  
    let newCounter = state.counter;
    switch (action.type) {
      case 'INCREMENT':
        newCounter = state.counter + 1;
        return loop(
          { ...state, counter: newCounter },
          cmdFetch(fetchCatsRequest(newCounter)) 
        );
      case 'DECREMENT':
        if (state.counter > 3) {
          newCounter = state.counter - 1;
          return loop(
            { ...state, counter: newCounter },
            cmdFetch(fetchCatsRequest(newCounter)))
        }
        return state;
      case 'FETCH_CATS_COMMIT':
          return { ...state, pictures: action.payload  };
    
      case 'FETCH_CATS_ROLLBACK':
          console.error("Failed to fetch pictures:", action.error);
          return state;
      case 'SELECT_PICTURE':
        return {...state, selectedPicture:action.picture}
      case "CLOSE_MODAL":
        return {...state,selectedPicture: null}
      default:
        return state;
    }
  }

export const counterSelector = (state: State) => state.counter;
export const picturesSelector = (state: State) => state.pictures;
export const getSelectedPicture = (state: State) =>state.selectedPicture;

export default compose(liftState, reducer);
