using System;
using System.Collections.Generic;

#nullable disable

namespace HouseCustomerAPI.Models
{
    public partial class StreetType
    {
        public StreetType()
        {
            AddressesHouses = new HashSet<AddressesHouse>();
        }

        public int Id { get; set; }
        public string StreetTypeName { get; set; }

        public virtual ICollection<AddressesHouse> AddressesHouses { get; set; }
    }
}
