import { ApartmentNumber } from "./dto/apartment-number.model";
import { HouseNumber } from "./dto/house-number.model";
import { Street } from "./dto/street.model";

export class Register {
    streets:Street[]=[];
    selectedStreet:Street=new Street();
    houseNumbers:HouseNumber[]=[];
    selectedHouseNumber:HouseNumber=new HouseNumber();
    apartmentNumbers:ApartmentNumber[]=[];
    selectedApartmentNumber:ApartmentNumber=new ApartmentNumber();
    name:string='';
    surname:string='';
    patronymic:string='';
    phoneNumber:string='';

}
