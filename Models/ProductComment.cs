﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Models
{
    [Table("ProductComment")]
    public partial class ProductComment
    {
        [Key]
        public int ProductCommentID { get; set; }
        [Column(TypeName = "ntext")]
        public string Content { get; set; }
        public bool? Status { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? CreateTime { get; set; }
        public int? ClientID { get; set; }
        public int? ProductID { get; set; }
        public int? Rate { get; set; }

        [ForeignKey("ClientID")]
        [InverseProperty("ProductComments")]
        public virtual Client Client { get; set; }
        [ForeignKey("ProductID")]
        [InverseProperty("ProductComments")]
        public virtual Product Product { get; set; }
    }

    public partial class ProductCommentList
    {
        public int ProductCommentID { get; set; }
        [Column(TypeName = "ntext")]
        public string Content { get; set; }
        public bool? Status { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime? CreateTime { get; set; }
        public int? ClientID { get; set; }
        public string ClientName { get; set; }
        public int? ProductID { get; set; }
        public int? Rate { get; set; }
        
    }
}