import { Picture } from "./picture.type";

export type Loading = { status: "loading" };  

export type Success = { 
  status: "success"; 
  data: Picture[]; 
};  

export type Failure = { 
  status: "failure"; 
  error: string; 
};  

export type ApiCallResult = Loading | Success | Failure;
