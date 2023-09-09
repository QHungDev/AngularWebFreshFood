namespace Models
{
    public partial class Email
    {
        public string To { get; set; } = string.Empty;
        public string Subject { get; set; } = string.Empty;
        public string Body { get; set; } = string.Empty;
        public string Quantity { get; set; } = string.Empty;
        public string Payment { get; set; } = string.Empty;
        public string Date { get; set; } = string.Empty;
        public List<ProductEmail> Products { get; set; } = new List<ProductEmail>();
        public string Total { get; set; } = string.Empty;
    }

    public partial class ProductEmail
    {
        public string ProductID { get; set; } = string.Empty;
        public string Quantity { get; set; } = string.Empty;
    }
}
