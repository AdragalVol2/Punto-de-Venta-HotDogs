using DogosChema.API.Entities;
using DogosSchema.API.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace DogosChema.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        //Tablas en la BD
        public DbSet<Product> Products { get; set; }
        public DbSet<Ingredient> Ingredients { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
    }
}