using System;
using System.Collections.Generic;

#nullable disable

namespace HouseCustomerAPI.Models
{
    public partial class Consumer
    {
        public Consumer()
        {
            ColdWaterReadings = new HashSet<ColdWaterReading>();
            HotWaterReadings = new HashSet<HotWaterReading>();
        }

        public int Id { get; set; }
        public int ApartmentId { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string Patronymic { get; set; }
        public string PhoneNumber { get; set; }

        public virtual Apartment Apartment { get; set; }
        public virtual ICollection<ColdWaterReading> ColdWaterReadings { get; set; }
        public virtual ICollection<HotWaterReading> HotWaterReadings { get; set; }
    }
}
