import { OperationClaim } from "./operationClaim";

export interface User{
    userId:number;
    userName:string;
    email:string;
    roles?:string[];
}