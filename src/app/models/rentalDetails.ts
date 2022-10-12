export interface RentalDetails{
    id:number
    userId:number
    carId:number
    carName:string
    plate:string;
    customerName:string
    rentDate:Date
    returnDate?:Date
}