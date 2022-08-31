export interface RentalDetails{
    id:number
    userId:number
    carId:number
    carName:string
    customerName:string
    rentDate:Date
    returnDate?:Date
}