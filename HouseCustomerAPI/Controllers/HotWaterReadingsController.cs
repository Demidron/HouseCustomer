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
    public class HotWaterReadingsController : ControllerBase
    {
        private readonly HouseConsumersDBContext _context;

        public HotWaterReadingsController(HouseConsumersDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("HotWaterReadingsByApartmentId/{id:int}")]
        public async Task<ActionResult<WaterReadingDTO>> GetLastHotWaterReadingByApartmentId(int id)
        {
            return await _context.HotWaterReadings
                .Where(x=>x.ApartmentId==id)
                .Select(x=>new WaterReadingDTO { 
                    Id =x.Id,
                    ApartmentId=x.Id,
                    ConsumerWriterId=x.ConsumerWriterId,
                    LastReadings=x.LastReadings,
                    LastReadingsDate=x.LastReadingsDate,
                    CurrentReadings=x.CurrentReadings,
                    CurrentReadingsDate=x.CurrentReadingsDate
                })
                .OrderByDescending(x => x.CurrentReadingsDate)
                .FirstAsync();
        }

        // GET: api/HotWaterReadings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<HotWaterReading>>> GetHotWaterReadings()
        {
            return await _context.HotWaterReadings.ToListAsync();
        }

        // GET: api/HotWaterReadings/5
        [HttpGet("{id}")]
        public async Task<ActionResult<HotWaterReading>> GetHotWaterReading(int id)
        {
            var hotWaterReading = await _context.HotWaterReadings.FindAsync(id);

            if (hotWaterReading == null)
            {
                return NotFound();
            }

            return hotWaterReading;
        }

        // PUT: api/HotWaterReadings/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHotWaterReading(int id, HotWaterReading hotWaterReading)
        {
            if (id != hotWaterReading.Id)
            {
                return BadRequest();
            }

            _context.Entry(hotWaterReading).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HotWaterReadingExists(id))
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

        // POST: api/HotWaterReadings
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<HotWaterReading>> PostHotWaterReading(HotWaterReading hotWaterReading)
        {
            _context.HotWaterReadings.Add(hotWaterReading);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetHotWaterReading", new { id = hotWaterReading.Id }, hotWaterReading);
        }

        // DELETE: api/HotWaterReadings/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHotWaterReading(int id)
        {
            var hotWaterReading = await _context.HotWaterReadings.FindAsync(id);
            if (hotWaterReading == null)
            {
                return NotFound();
            }

            _context.HotWaterReadings.Remove(hotWaterReading);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool HotWaterReadingExists(int id)
        {
            return _context.HotWaterReadings.Any(e => e.Id == id);
        }
    }
}
