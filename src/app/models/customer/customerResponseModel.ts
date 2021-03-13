import { ResponseModel } from "../responseModel";
import { Customer } from "./cutomer";

export interface CustomerResponseModel extends ResponseModel{
    data:Customer[];
}