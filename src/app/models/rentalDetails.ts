export interface RentalDetails{
    id:number
    userId:number
    carId:number
    carName:string
    plate:string;
    userName:string
    rentDate:Date
    returnDate?:Date
}