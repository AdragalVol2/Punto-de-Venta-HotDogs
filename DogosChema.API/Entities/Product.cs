namespace DogosChema.API.Entities
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string Image { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;

        // Relación: Un producto tiene muchos ingredientes por defecto
        public List<Ingredient> DefaultIngredients { get; set; } = new();
    }
}