using System;
using System.Collections.Generic;

#nullable disable

namespace HouseCustomerAPI.Models
{
    public partial class ConsumersApartment
    {
        public int Id { get; set; }
        public int ConsumerId { get; set; }
        public int ApartmentId { get; set; }

        public virtual Apartment Apartment { get; set; }
        public virtual Consumer Consumer { get; set; }
    }
}
