﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Models
{
    public partial class DBContext : DbContext
    {
        public DBContext()
        {
        }

        public DBContext(DbContextOptions<DBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Account> Accounts { get; set; }
        public virtual DbSet<AccountCategory> AccountCategories { get; set; }
        public virtual DbSet<Article> Articles { get; set; }
        public virtual DbSet<ArticleCategory> ArticleCategories { get; set; }
        public virtual DbSet<Client> Clients { get; set; }
        public virtual DbSet<ClientCategory> ClientCategories { get; set; }
        public virtual DbSet<Contact> Contacts { get; set; }
        public virtual DbSet<ContactCategory> ContactCategories { get; set; }
        public virtual DbSet<Order> Orders { get; set; }
        public virtual DbSet<OrderDetail> OrderDetails { get; set; }
        public virtual DbSet<Picture> Pictures { get; set; }
        public virtual DbSet<PictureCategory> PictureCategories { get; set; }
        public virtual DbSet<Product> Products { get; set; }
        public virtual DbSet<ProductCategory> ProductCategories { get; set; }
        public virtual DbSet<ProductComment> ProductComments { get; set; }
        public virtual DbSet<ProductMainCategory> ProductMainCategories { get; set; }
        public virtual DbSet<ProductVote> ProductVotes { get; set; }
        public virtual DbSet<RequestSupply> RequestSupplies { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<RequestSupply>(entity =>
            {
                entity.HasKey(e => e.ID)
                    .HasName("PK_RequestSupply");
            });

            modelBuilder.Entity<Account>(entity =>
            {
                entity.HasKey(e => e.Username)
                    .HasName("PK__Account__536C85E5D8BD64AA");

                entity.HasOne(d => d.AccountCategory)
                    .WithMany(p => p.Accounts)
                    .HasForeignKey(d => d.AccountCategoryID)
                    .HasConstraintName("FK__Account__Account__1273C1CD");
            });

            modelBuilder.Entity<Article>(entity =>
            {
                entity.HasOne(d => d.ArticleCategory)
                    .WithMany(p => p.Articles)
                    .HasForeignKey(d => d.ArticleCategoryID)
                    .HasConstraintName("FK__Article__Article__300424B4");

                entity.HasOne(d => d.CreateByNavigation)
                    .WithMany(p => p.Articles)
                    .HasForeignKey(d => d.CreateBy)
                    .HasConstraintName("FK__Article__CreateB__239E4DCF");
            });

            modelBuilder.Entity<ArticleCategory>(entity =>
            {
                entity.HasOne(d => d.CreateByNavigation)
                    .WithMany(p => p.ArticleCategories)
                    .HasForeignKey(d => d.CreateBy)
                    .HasConstraintName("FK__ArticleCa__Creat__1FCDBCEB");
            });

            modelBuilder.Entity<Client>(entity =>
            {
                entity.HasOne(d => d.ClientCategory)
                    .WithMany(p => p.Clients)
                    .HasForeignKey(d => d.ClientCategoryID)
                    .HasConstraintName("FK__Client__ClientCa__32E0915F");
            });

            modelBuilder.Entity<ClientCategory>(entity =>
            {
                entity.HasOne(d => d.CreateByNavigation)
                    .WithMany(p => p.ClientCategories)
                    .HasForeignKey(d => d.CreateBy)
                    .HasConstraintName("FK__ClientCat__Creat__2D27B809");
            });

            modelBuilder.Entity<Contact>(entity =>
            {
                entity.HasOne(d => d.ApproveByNavigation)
                    .WithMany(p => p.Contacts)
                    .HasForeignKey(d => d.ApproveBy)
                    .HasConstraintName("FK__Contact__Approve__44FF419A");

                entity.HasOne(d => d.ContactCategory)
                    .WithMany(p => p.Contacts)
                    .HasForeignKey(d => d.ContactCategoryID)
                    .HasConstraintName("FK__Contact__Contact__35BCFE0A");
            });

            modelBuilder.Entity<ContactCategory>(entity =>
            {
                entity.HasOne(d => d.CreateByNavigation)
                    .WithMany(p => p.ContactCategories)
                    .HasForeignKey(d => d.CreateBy)
                    .HasConstraintName("FK__ContactCa__Creat__412EB0B6");
            });

            modelBuilder.Entity<Order>(entity =>
            {
                entity.HasOne(d => d.Client)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.ClientID)
                    .HasConstraintName("FK__Order__ClientID__37A5467C");
            });

            modelBuilder.Entity<OrderDetail>(entity =>
            {
                entity.HasKey(e => new { e.OrderID, e.ProductID })
                    .HasName("PK__OrderDet__08D097C1038F1956");

                entity.HasOne(d => d.Order)
                    .WithMany(p => p.OrderDetails)
                    .HasForeignKey(d => d.OrderID)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__OrderDeta__Order__38996AB5");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.OrderDetails)
                    .HasForeignKey(d => d.ProductID)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__OrderDeta__Produ__398D8EEE");
            });

            modelBuilder.Entity<Picture>(entity =>
            {
                entity.HasOne(d => d.CreateByNavigation)
                    .WithMany(p => p.Pictures)
                    .HasForeignKey(d => d.CreateBy)
                    .HasConstraintName("FK__Picture__CreateB__2A4B4B5E");

                entity.HasOne(d => d.PictureCategory)
                    .WithMany(p => p.Pictures)
                    .HasForeignKey(d => d.PictureCategoryID)
                    .HasConstraintName("FK__Picture__Picture__3B75D760");
            });

            modelBuilder.Entity<PictureCategory>(entity =>
            {
                entity.HasOne(d => d.CreateByNavigation)
                    .WithMany(p => p.PictureCategories)
                    .HasForeignKey(d => d.CreateBy)
                    .HasConstraintName("FK__PictureCa__Creat__267ABA7A");
            });

            modelBuilder.Entity<Product>(entity =>
            {
                entity.HasOne(d => d.CreateByNavigation)
                    .WithMany(p => p.Products)
                    .HasForeignKey(d => d.CreateBy)
                    .HasConstraintName("FK__Product__CreateB__1CF15040");

                entity.HasOne(d => d.ProductCategory)
                    .WithMany(p => p.Products)
                    .HasForeignKey(d => d.ProductCategoryID)
                    .HasConstraintName("FK__Product__Product__3E52440B");
            });

            modelBuilder.Entity<ProductCategory>(entity =>
            {
                entity.HasOne(d => d.CreateByNavigation)
                    .WithMany(p => p.ProductCategories)
                    .HasForeignKey(d => d.CreateBy)
                    .HasConstraintName("FK__ProductCa__Creat__1920BF5C");

                entity.HasOne(d => d.ProductMainCategory)
                    .WithMany(p => p.ProductCategories)
                    .HasForeignKey(d => d.ProductMainCategoryID)
                    .HasConstraintName("FK__ProductCa__Produ__403A8C7D");
            });

            modelBuilder.Entity<ProductComment>(entity =>
            {
                entity.HasOne(d => d.Client)
                    .WithMany(p => p.ProductComments)
                    .HasForeignKey(d => d.ClientID)
                    .HasConstraintName("FK__ProductCo__Clien__412EB0B6");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.ProductComments)
                    .HasForeignKey(d => d.ProductID)
                    .HasConstraintName("FK__ProductCo__Produ__4222D4EF");
            });

            modelBuilder.Entity<ProductMainCategory>(entity =>
            {
                entity.HasOne(d => d.CreateByNavigation)
                    .WithMany(p => p.ProductMainCategories)
                    .HasForeignKey(d => d.CreateBy)
                    .HasConstraintName("FK__ProductMa__Creat__15502E78");
            });

            modelBuilder.Entity<ProductVote>(entity =>
            {
                entity.HasKey(e => new { e.ClientID, e.ProductID })
                    .HasName("PK__ProductV__2D3ED66A3DDE9580");

                entity.HasOne(d => d.Client)
                    .WithMany(p => p.ProductVotes)
                    .HasForeignKey(d => d.ClientID)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__ProductVo__Clien__440B1D61");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.ProductVotes)
                    .HasForeignKey(d => d.ProductID)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__ProductVo__Produ__44FF419A");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}