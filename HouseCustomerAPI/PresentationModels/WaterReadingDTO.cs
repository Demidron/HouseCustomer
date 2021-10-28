using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HouseCustomerAPI.PresentationModels
{
    public class WaterReadingDTO
    {
        public int Id { get; set; }
        public int ApartmentId { get; set; }
        public int ConsumerWriterId { get; set; }
        public int? LastReadings { get; set; }
        public DateTime? LastReadingsDate { get; set; }
        public int CurrentReadings { get; set; }
        public DateTime CurrentReadingsDate { get; set; }
    }
}
