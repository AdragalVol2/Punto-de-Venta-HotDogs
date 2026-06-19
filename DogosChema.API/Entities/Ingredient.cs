namespace DogosChema.API.Entities
{
    public class Ingredient
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int Quantity { get; set; }

        //Relación con Producto 
        public int ProductId { get; set; }
    }
}