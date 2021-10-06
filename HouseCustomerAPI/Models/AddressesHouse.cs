using System;
using System.Collections.Generic;

#nullable disable

namespace HouseCustomerAPI.Models
{
    public partial class AddressesHouse
    {
        public AddressesHouse()
        {
            Apartments = new HashSet<Apartment>();
        }

        public int Id { get; set; }
        public int TypeId { get; set; }
        public int StreetId { get; set; }
        public string NumberHouse { get; set; }

        public virtual Street Street { get; set; }
        public virtual StreetType Type { get; set; }
        public virtual ICollection<Apartment> Apartments { get; set; }
    }
}
