using DogosChema.API.Entities;
using Microsoft.EntityFrameworkCore;

namespace DogosChema.API.Data
{
    public static class DbInitializer
    {
        public static void Seed(DataContext context)
        {
            // Aplica migraciones pendientes automáticamente si las hay
            context.Database.Migrate();

            // Si ya hay productos, no hacemos nada
            if (context.Products.Any()) return;

            var products = new List<Product>
            {
                new Product
                {
                    Name = "Hot Dog Clásico",
                    Description = "Salchicha, tomate, cebolla y aderezos.",
                    Price = 55,
                    Image = "",
                    Category = "Dogos",
                    DefaultIngredients = new List<Ingredient>
                    {
                        new Ingredient { Name = "Salchicha", Quantity = 1 },
                        new Ingredient { Name = "Tomate", Quantity = 1 },
                        new Ingredient { Name = "Cebolla", Quantity = 1 },
                        new Ingredient { Name = "Mayonesa", Quantity = 1 }
                    }
                },
                new Product
                {
                    Name = "Hot Dog Especial",
                    Description = "Tocino, queso cheddar y jalapeños.",
                    Price = 75,
                    Image = "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=500",
                    Category = "Dogos",
                    DefaultIngredients = new List<Ingredient>
                    {
                        new Ingredient { Name = "Salchicha", Quantity = 1 },
                        new Ingredient { Name = "Tocino", Quantity = 1 },
                        new Ingredient { Name = "Queso Cheddar", Quantity = 1 },
                        new Ingredient { Name = "Jalapeños", Quantity = 1 }
                    }
                },
                new Product
                {
                    Name = "Papas Francesas",
                    Description = "Porción grande.",
                    Price = 45,
                    Image = "https://images.unsplash.com/photo-1576107232684-1279f390859f?w=500",
                    Category = "Complementos"
                },
                new Product
                {
                    Name = "Refresco",
                    Description = "600 ml.",
                    Price = 30,
                    Image = "https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=500",
                    Category = "Bebidas"
                }
            };

            context.Products.AddRange(products);
            context.SaveChanges();
        }
    }
}