using DogosChema.API.Entities;
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
    }
}