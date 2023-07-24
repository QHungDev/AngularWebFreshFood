﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Models
{
    [Table("Client")]
    public partial class Client
    {
        public Client()
        {
            Orders = new HashSet<Order>();
            ProductComments = new HashSet<ProductComment>();
            ProductVotes = new HashSet<ProductVote>();
        }

        [Key]
        public int ClientID { get; set; }
        [StringLength(255)]
        public string Email { get; set; }
        [StringLength(50)]
        public string Password { get; set; }
        [StringLength(50)]
        public string FullName { get; set; }
        [StringLength(15)]
        public string Mobile { get; set; }
        [StringLength(255)]
        public string Address { get; set; }
        public bool? Status { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? CreateTime { get; set; }
        public int? ClientCategoryID { get; set; }

        [ForeignKey("ClientCategoryID")]
        [InverseProperty("Clients")]
        public virtual ClientCategory ClientCategory { get; set; }
        [InverseProperty("Client")]
        public virtual ICollection<Order> Orders { get; set; }
        [InverseProperty("Client")]
        public virtual ICollection<ProductComment> ProductComments { get; set; }
        [InverseProperty("Client")]
        public virtual ICollection<ProductVote> ProductVotes { get; set; }
    }
}