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
    public class ConsumersApartmentsController : ControllerBase
    {
        private readonly HouseConsumersDBContext _context;

        public ConsumersApartmentsController(HouseConsumersDBContext context)
        {
            _context = context;
        }


        [HttpGet]
        [Route("ApartmentsByConsumerId/{id:int}")]
        public async Task<ActionResult<IEnumerable<ApartmentDTO>>> GetApartmentsByConsumerId(int id)
        {
            var consumersApartment = await _context.ConsumersApartments.Where(x => x.ConsumerId == id).Select(conap => new ApartmentDTO
            {
                ApartmentId = conap.Apartment.Id,
                ApartmentNumber = conap.Apartment.ApartmentNumber,
                FullAdress = conap.Apartment.AddressHouse.Type.StreetTypeName + " " +
                            conap.Apartment.AddressHouse.Street.StreetName + " " +
                            conap.Apartment.AddressHouse.HouseNumber
            }).ToListAsync();

            return consumersApartment;
        }

        // GET: api/ConsumersApartments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ConsumersApartment>>> GetConsumersApartments()
        {
            return await _context.ConsumersApartments.ToListAsync();
        }

        // GET: api/ConsumersApartments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ConsumersApartment>> GetConsumersApartment(int id)
        {
            var consumersApartment = await _context.ConsumersApartments.FindAsync(id);

            if (consumersApartment == null)
            {
                return NotFound();
            }

            return consumersApartment;
        }

        // PUT: api/ConsumersApartments/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutConsumersApartment(int id, ConsumersApartment consumersApartment)
        {
            if (id != consumersApartment.Id)
            {
                return BadRequest();
            }

            _context.Entry(consumersApartment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ConsumersApartmentExists(id))
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

        // POST: api/ConsumersApartments
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ConsumersApartment>> PostConsumersApartment(ConsumersApartment consumersApartment)
        {
            _context.ConsumersApartments.Add(consumersApartment);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetConsumersApartment", new { id = consumersApartment.Id }, consumersApartment);
        }

        // DELETE: api/ConsumersApartments/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteConsumersApartment(int id)
        {
            var consumersApartment = await _context.ConsumersApartments.FindAsync(id);
            if (consumersApartment == null)
            {
                return NotFound();
            }

            _context.ConsumersApartments.Remove(consumersApartment);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ConsumersApartmentExists(int id)
        {
            return _context.ConsumersApartments.Any(e => e.Id == id);
        }
    }
}
