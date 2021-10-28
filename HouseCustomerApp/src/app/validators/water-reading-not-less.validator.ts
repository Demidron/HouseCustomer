import { AbstractControl } from "@angular/forms";
import { WaterReadoutService } from "../services/water-readout.service";

export class ValidateWaterReading {
  static createValidator(waterReadoutService:WaterReadoutService) {
    return (control: AbstractControl) => {
        let lr=waterReadoutService.hotWaterReading.lastReadings;
        return lr&&lr>parseInt(control.value) ? {waterReadingLessPrev: true} : null;
    }
  }
}