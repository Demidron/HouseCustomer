using System;
using System.Collections.Generic;

#nullable disable

namespace HouseCustomerAPI.Models
{
    public partial class Apartment
    {
        public Apartment()
        {
            ColdWaterReadings = new HashSet<ColdWaterReading>();
            ConsumersApartments = new HashSet<ConsumersApartment>();
            HotWaterReadings = new HashSet<HotWaterReading>();
        }

        public int Id { get; set; }
        public int ApartmentNumber { get; set; }
        public int AddressHouseId { get; set; }
        public bool IsHaveBoiler { get; set; }
        public byte? CountRegisteredResidents { get; set; }

        public virtual AddressesHouse AddressHouse { get; set; }
        public virtual ICollection<ColdWaterReading> ColdWaterReadings { get; set; }
        public virtual ICollection<ConsumersApartment> ConsumersApartments { get; set; }
        public virtual ICollection<HotWaterReading> HotWaterReadings { get; set; }
    }
}
