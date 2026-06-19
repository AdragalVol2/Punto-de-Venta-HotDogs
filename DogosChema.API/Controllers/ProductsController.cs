using DogosChema.API.Data;
using DogosChema.API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DogosChema.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")] // Esto generará la ruta: api/products
    public class ProductsController : ControllerBase
    {
        private readonly DataContext _context;

        public ProductsController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            // El Include es vital para traer la lista de ingredientes hijos
            var products = await _context.Products
                .Include(p => p.DefaultIngredients)
                .ToListAsync();

            return Ok(products);
        }
    }
}