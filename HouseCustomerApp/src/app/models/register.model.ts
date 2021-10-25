import { Apartment } from "./dto/apartment.model";
import { HouseNumber } from "./dto/house-number.model";
import { Street } from "./dto/street.model";

export class Register {
    streets:Street[]=[]; 
    houseNumbers:HouseNumber[]=[];
    apartmentNumbers:Apartment[]=[];
}
