
export class Address
{
    houseNo : string;
    street : string;
    city : string;
    pinCode : string;

    constructor(houseNo:any, street:any, city:any, pinCode:any)
    {
        this.houseNo = houseNo;
        this.street = street;
        this.city = city;
        this.pinCode = pinCode;
    }
}