using System;
using System.Collections.Generic;

#nullable disable

namespace HouseCustomerAPI.Models
{
    public partial class Street
    {
        public Street()
        {
            AddressesHouses = new HashSet<AddressesHouse>();
        }

        public int Id { get; set; }
        public string StreetName { get; set; }

        public virtual ICollection<AddressesHouse> AddressesHouses { get; set; }
    }
}
