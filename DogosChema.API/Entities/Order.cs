
using DogosSchema.API.Entities;
namespace DogosSchema.API.Entities;
public class Order
{
    public int Id {get; set;}
    public DateTime OrderDate {get; set;} = DateTime.UtcNow;
    public decimal Total {get; set;}

    public List<OrderItem> OrderItems {get;set;} = new();
}