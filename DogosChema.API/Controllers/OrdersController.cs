using DogosChema.API.Data;
using DogosChema.API.DTOs;
using DogosSchema.API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DogosChema.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly DataContext _context;

        public OrdersController(DataContext context)
        {
            _context = context;
        }


        [HttpPost]
        public async Task<ActionResult<Order>> CreateOrder(CreateOrderDto dto)
        {
            if (dto.Items == null || !dto.Items.Any())
            {
                return BadRequest("La orden debe contener al menos un producto.");
            }

            var order = new Order
            {
                OrderDate = DateTime.UtcNow,
                Total = 0
            };

            decimal acumulatedTotal = 0;

            foreach (var itemDto in dto.Items)
            {
                var product = await _context.Products.FindAsync(itemDto.ProductId);
                if (product == null)
                {
                    return NotFound($"El producto con ID {itemDto.ProductId} no existe.");
                }

                var orderItem = new OrderItem
                {
                    ProductId = product.Id,
                    Quantity = itemDto.Quantity,
                    UnitPrice = product.Price 
                };

                acumulatedTotal += product.Price * itemDto.Quantity;

                order.OrderItems.Add(orderItem);
            }

            order.Total = acumulatedTotal; 
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetOrder), new {id = order.Id}, order);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            var order = await _context.Orders.Include(o => o.OrderItems).ThenInclude(oi => oi.Product).FirstOrDefaultAsync(o => o.Id == id);

            if (order == null) return NotFound();

            return order;
        }
    }
}