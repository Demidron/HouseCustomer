export class WaterReading {
    id?:number;
    apartmentId:number=0;
    consumerWriterId:number=0;
    lastReadings?:number;
    lastReadingsDate?:Date;
    currentReadings:number=0;
    currentReadingsDate :Date=new Date();
}
