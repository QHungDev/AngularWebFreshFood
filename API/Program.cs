//Cần cài đặt gói NewtonsoftJson
using Microsoft.AspNetCore.Mvc.NewtonsoftJson;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Models;
using System;
using API.Interfaces;
using API.Services;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);
const string AllowAllHeadersPolicy = "AllowAllHeadersPolicy";

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var connection = builder.Configuration.GetConnectionString("MyDB");
builder.Services.AddDbContext<DBContext>(x => x.UseSqlServer(connection));

builder.Services.AddControllers().AddNewtonsoftJson(x =>
{
    x.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
});

builder.Services.AddCors(x =>
{
    x.AddPolicy(AllowAllHeadersPolicy, x =>
    {
        x.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin();
    });
});

builder.Services.AddTransient<IAccountService, AccountService>();
builder.Services.AddTransient<IClientService, ClientService>();
builder.Services.AddTransient<IAccountCategoryService, AccountCategoryService>();
builder.Services.AddTransient<IContactService, ContactService>();
builder.Services.AddTransient<IArticleService, ArticleService>();
builder.Services.AddTransient<IPictureService, PictureService>();
builder.Services.AddTransient<IProductService, ProductService>();
builder.Services.AddTransient<IOrderService, OrderService>();
builder.Services.AddTransient<IOrderDetailService, OrderDetailService>();
builder.Services.AddTransient<IProductCategoryService, ProductCategoryService>();
builder.Services.AddTransient<IProductMainCategoryService, ProductMainCategoryService>();
builder.Services.AddTransient<IArticleCategoryService, ArticleCategoryService>();
builder.Services.AddTransient<IEmailService, EmailService>();
builder.Services.AddTransient<IMomoService, MomoService>();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
   
}
app.UseSwagger();
app.UseSwaggerUI();
app.UseCors(AllowAllHeadersPolicy);
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();