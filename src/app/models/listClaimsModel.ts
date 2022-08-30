import { OperationClaim } from "./operationClaim";
import { UserOperationClaim } from "./userOperationClaim";

export interface ListClaimsModel{
    operationClaim:OperationClaim[]
    userOperationClaim:UserOperationClaim[]
}