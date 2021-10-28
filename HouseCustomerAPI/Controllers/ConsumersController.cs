using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HouseCustomerAPI.Models;
using System.Net;
using HouseCustomerAPI.PresentationModels;

namespace HouseCustomerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConsumersController : ControllerBase
    {
        private readonly HouseConsumersDBContext _context;

        public ConsumersController(HouseConsumersDBContext context)
        {
            _context = context;
        }


        [HttpGet]
        [Route("ConsumersByPhoneNumber/{phoneNumber}")]
        public async Task<ActionResult<ConsumerDTO>> GetConsumersByPhoneNumber(string phoneNumber)
        {

            try
            {
                return await _context.Consumers.Where(x => x.PhoneNumber == phoneNumber).Select(consumer => new ConsumerDTO
                {
                    Id=consumer.Id,
                    Name=consumer.Name,
                    LastName=consumer.LastName,
                    Patronymic=consumer.Patronymic,
                    PhoneNumber=consumer.PhoneNumber
                }).FirstAsync();
            }
            catch (InvalidOperationException ex)
            {
                ContentResult cr = new ContentResult() { 
                    ContentType = "application/json", 
                    StatusCode = (int)HttpStatusCode.NotFound, 
                    Content = "Consumer not found" 
                };
                return cr;
            }

        }

        [HttpGet]
        [Route("PhoneNumberNotTaken/{phoneNumber}")]
        public async Task<bool> checkPhoneNumberNotTaken(string phoneNumber)
        {
            try
            {
                await _context.Consumers.FirstAsync(x => x.PhoneNumber== phoneNumber);
                return true;
            }
            catch (InvalidOperationException ex)
            {
                return false;
            }


        }

        // GET: api/Consumers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Consumer>>> GetConsumers()
        {
            return await _context.Consumers.ToListAsync();
        }

        // GET: api/Consumers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Consumer>> GetConsumer(int id)
        {
            var consumer = await _context.Consumers.FindAsync(id);

            if (consumer == null)
            {
                return NotFound();
            }

            return consumer;
        }

        // PUT: api/Consumers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutConsumer(int id, Consumer consumer)
        {
            if (id != consumer.Id)
            {
                return BadRequest();
            }

            _context.Entry(consumer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ConsumerExists(id))
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

        // POST: api/Consumers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Consumer>> PostConsumer(Consumer consumer)
        {
            _context.Consumers.Add(consumer);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetConsumer", new { id = consumer.Id }, consumer);
        }

        // DELETE: api/Consumers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteConsumer(int id)
        {
            var consumer = await _context.Consumers.FindAsync(id);
            if (consumer == null)
            {
                return NotFound();
            }

            _context.Consumers.Remove(consumer);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ConsumerExists(int id)
        {
            return _context.Consumers.Any(e => e.Id == id);
        }
    }
}
