﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Models
{
    [Table("Product")]
    public partial class Product
    {
        public Product()
        {
            OrderDetails = new HashSet<OrderDetail>();
            ProductComments = new HashSet<ProductComment>();
            ProductVotes = new HashSet<ProductVote>();
        }

        [Key]
        public int ProductID { get; set; }
        [StringLength(255)]
        public string Avatar { get; set; }
        [StringLength(255)]
        public string Thumb { get; set; }
        [StringLength(255)]
        public string Title { get; set; }
        [StringLength(4000)]
        public string Description { get; set; }
        [StringLength(4000)]
        public string Specification { get; set; }
        [Column(TypeName = "ntext")]
        public string Content { get; set; }
        [StringLength(255)]
        public string Warranty { get; set; }
        [StringLength(255)]
        public string Accessories { get; set; }
        public double? Price { get; set; }
        public double? OldPrice { get; set; }
        public int? Quantity { get; set; }
        [StringLength(4000)]
        public string ImageList { get; set; }
        public int? Position { get; set; }
        public bool? Status { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? CreateTime { get; set; }
        public int? ProductCategoryID { get; set; }
        [StringLength(50)]
        public string CreateBy { get; set; }

        [ForeignKey("CreateBy")]
        [InverseProperty("Products")]
        public virtual Account CreateByNavigation { get; set; }
        [ForeignKey("ProductCategoryID")]
        [InverseProperty("Products")]
        public virtual ProductCategory ProductCategory { get; set; }
        [InverseProperty("Product")]
        public virtual ICollection<OrderDetail> OrderDetails { get; set; }
        [InverseProperty("Product")]
        public virtual ICollection<ProductComment> ProductComments { get; set; }
        [InverseProperty("Product")]
        public virtual ICollection<ProductVote> ProductVotes { get; set; }
    }
}