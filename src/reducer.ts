import { Loop, liftState } from 'redux-loop';
import { compose } from 'redux';
import fakeData from './fake-datas.json';
import { Picture } from './types/picture.type';
import { CloseModal, SelectPicture } from './types/actions.type';

export type State = {
  counter: number,
  pictures: Picture[];
  selectedPicture: Picture | null
}

export const defaultState: State = {
  counter: 0,
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

  export const reducer = (state: State | undefined, action: Actions): State | Loop<State> => {
    if (!state) return defaultState;
  
    let newCounter = state.counter;
    switch (action.type) {
      case 'INCREMENT':
        newCounter = state.counter + 1;
        break;
      case 'DECREMENT':
        if (state.counter > 3) {
          newCounter = state.counter - 1;
        }
        break;
      case 'SELECT_PICTURE':
        return {...state, selectedPicture:action.picture}
      case "CLOSE_MODAL":
        return {...state,selectedPicture: null}
      default:
        return state;
    }
    console.log("New pictures state:", fakeData.slice(0, newCounter));

    return {
      ...state,
      counter: newCounter,
      pictures: fakeData.slice(0, newCounter),
    };
  };

export const counterSelector = (state: State) => state.counter;
export const picturesSelector = (state: State) => state.pictures;
export const getSelectedPicture = (state: State) =>state.selectedPicture;

export default compose(liftState, reducer);
