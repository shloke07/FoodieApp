export class Cuisine
{
    cuisineId:string;
    cuisineName:string;
    cuisineDescription:string;
    price:number;
    qty:number;
    image:any;

    constructor(cuisineId:any, cuisineName:any, cuisineDescription:any, price:any,qty:any, image:any)
    {   
        this.cuisineId = cuisineId;
        this.cuisineName = cuisineName;
        this.cuisineDescription = cuisineDescription;
        this.price = price;
        this.qty=qty;
        this.image = image;
    }
}