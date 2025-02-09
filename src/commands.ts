import { Cmd } from 'redux-loop';
import { fetchCatsCommit, fetchCatsRollback } from './actions';
import { FetchCatsRequest } from './types/actions.type';

export const cmdFetch = (action: FetchCatsRequest) =>
  Cmd.run(
    () => {
      console.log('je passe ici')
      return fetch(action.path, {
        method: action.method,
      }).then(checkStatus)
        .then((response) => response.json());
    },
    
    {
      successActionCreator: (jsonResponse) => fetchCatsCommit(jsonResponse.hits), // (equals to (payload) => fetchCatsCommit(payload))
      failActionCreator: fetchCatsRollback, // (equals to (error) => fetchCatsCommit(error))
    },
  );

const checkStatus = (response: Response) => {
  if (response.ok) return response;
  throw new Error(response.statusText);
};
