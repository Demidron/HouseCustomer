using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HouseCustomerAPI.Models;
using HouseCustomerAPI.PresentationModels;

namespace HouseCustomerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddressesHousesController : ControllerBase
    {
        private readonly HouseConsumersDBContext _context;

        public AddressesHousesController(HouseConsumersDBContext context)
        {
            _context = context;
        }

        // POST: api/StreetHouses
        [Route("StreetHouses")]
        [HttpPost]
        public async Task<ActionResult<IEnumerable<HouseNumberDTO>>> GetAllHousesOnStreet(StreetDTO streetDTO)
        {
            var strs = await _context.AddressesHouses.Where(x=>x.StreetId==streetDTO.StreetId&&x.TypeId==streetDTO.TypeStreetId)
                .Select(a=>new HouseNumberDTO { Id=a.Id, HouseNumber=a.HouseNumber}).ToListAsync();

            return strs;
        }
        // GET: api/Streets
        [Route("Streets")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<StreetDTO>>> GetAllHouseStreets()
        {
            var strs = await _context.AddressesHouses
                .OrderBy(x => x.Street.StreetName)
                .Select(x=>new StreetDTO { StreetId = x.StreetId, TypeStreetId = x.TypeId, StreetName = x.Type.StreetTypeName + ' ' + x.Street.StreetName })
                .Distinct()
                .ToListAsync();

            return strs;
        }
    



        // GET: api/AddressesHouses
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AddressesHouse>>> GetAddressesHouses()
        {
            return await _context.AddressesHouses.ToListAsync();
        }

        // GET: api/AddressesHouses/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AddressesHouse>> GetAddressesHouse(int id)
        {
            var addressesHouse = await _context.AddressesHouses.FindAsync(id);

            if (addressesHouse == null)
            {
                return NotFound();
            }

            return addressesHouse;
        }

        // PUT: api/AddressesHouses/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAddressesHouse(int id, AddressesHouse addressesHouse)
        {
            if (id != addressesHouse.Id)
            {
                return BadRequest();
            }

            _context.Entry(addressesHouse).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AddressesHouseExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/AddressesHouses
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<AddressesHouse>> PostAddressesHouse(AddressesHouse addressesHouse)
        {
            _context.AddressesHouses.Add(addressesHouse);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAddressesHouse", new { id = addressesHouse.Id }, addressesHouse);
        }

        // DELETE: api/AddressesHouses/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAddressesHouse(int id)
        {
            var addressesHouse = await _context.AddressesHouses.FindAsync(id);
            if (addressesHouse == null)
            {
                return NotFound();
            }

            _context.AddressesHouses.Remove(addressesHouse);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AddressesHouseExists(int id)
        {
            return _context.AddressesHouses.Any(e => e.Id == id);
        }
    }
}
