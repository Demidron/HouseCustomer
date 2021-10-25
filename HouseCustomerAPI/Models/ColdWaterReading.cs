using System;
using System.Collections.Generic;

#nullable disable

namespace HouseCustomerAPI.Models
{
    public partial class ColdWaterReading
    {
        public int Id { get; set; }
        public int ApartmentId { get; set; }
        public int ConsumerWriterId { get; set; }
        public int? LastReadings { get; set; }
        public DateTime? LastReadingsDate { get; set; }
        public int CurrentReadings { get; set; }
        public DateTime CurrentReadingsDate { get; set; }

        public virtual Apartment Apartment { get; set; }
        public virtual Consumer ConsumerWriter { get; set; }
    }
}
