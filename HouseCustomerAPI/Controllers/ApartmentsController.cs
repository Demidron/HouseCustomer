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
    public class ApartmentsController : ControllerBase
    {
        private readonly HouseConsumersDBContext _context;

        public ApartmentsController(HouseConsumersDBContext context)
        {
            _context = context;
        }

        // GET: api/HouseApartments
        [HttpGet]
        [Route("ApartmentByApartmentId/{id:int}")]
        public async Task<ActionResult<ApartmentDTO>> GetApartmentByApartmentId(int id)
        {
            return await _context.Apartments.Where(x => x.Id == id).Select(apartment => new ApartmentDTO
            {
                ApartmentId = apartment.Id,
                ApartmentNumber = apartment.ApartmentNumber,
                FullAdress = apartment.AddressHouse.Type.StreetTypeName + " " +
                        apartment.AddressHouse.Street.StreetName + " " +
                        apartment.AddressHouse.HouseNumber
            }).FirstOrDefaultAsync();
            //var st = new ApartmentDTO  ////Object reference not set to an instance of an object 
            //{
            //    ApartmentId = apartment.Id,
            //    ApartmentNumber = apartment.ApartmentNumber,
            //    FullAdress = apartment.AddressHouse.Type.StreetTypeName + " " +
            //        apartment.AddressHouse.Street.StreetName + " " +
            //        apartment.AddressHouse.HouseNumber
            //};
            //return st;
        }
        // GET: api/HouseApartments
        [HttpGet]
        [Route("HouseApartments/{id:int}")]
        public async Task<ActionResult<IEnumerable<ApartmentDTO>>> GetHouseApartments(int id)
        {
            var apartments = await _context.Apartments.Where(ap => ap.AddressHouseId == id)
                .Select(x => new ApartmentDTO { ApartmentId = x.Id, ApartmentNumber = x.ApartmentNumber,
                    FullAdress=x.AddressHouse.Type.StreetTypeName+" "+ 
                    x.AddressHouse.Street.StreetName + " " +
                    x.AddressHouse.HouseNumber
                })
                .ToListAsync();
            return apartments;
        }

        // GET: api/Apartments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Apartment>>> GetApartments()
        {
            return await _context.Apartments.ToListAsync();
        }

        // GET: api/Apartments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Apartment>> GetApartment(int id)
        {
            var apartment = await _context.Apartments.FindAsync(id);

            if (apartment == null)
            {
                return NotFound();
            }

            return apartment;
        }

        // PUT: api/Apartments/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutApartment(int id, Apartment apartment)
        {
            if (id != apartment.Id)
            {
                return BadRequest();
            }

            _context.Entry(apartment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ApartmentExists(id))
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

        // POST: api/Apartments
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Apartment>> PostApartment(Apartment apartment)
        {
            _context.Apartments.Add(apartment);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetApartment", new { id = apartment.Id }, apartment);
        }

        // DELETE: api/Apartments/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteApartment(int id)
        {
            var apartment = await _context.Apartments.FindAsync(id);
            if (apartment == null)
            {
                return NotFound();
            }

            _context.Apartments.Remove(apartment);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ApartmentExists(int id)
        {
            return _context.Apartments.Any(e => e.Id == id);
        }
    }
}
