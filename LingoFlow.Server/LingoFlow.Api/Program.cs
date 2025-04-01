//using Microsoft.AspNetCore.Authentication.JwtBearer;
//using Microsoft.IdentityModel.Tokens;
//using Microsoft.EntityFrameworkCore;
//using System.Text;
//using LingoFlow.Core.Services;
//using LingoFlow.Service;
//using LingoFlow.Core.Repositories;
//using LingoFlow.Data.Repositories;
//using LingoFlow.Data;
//using LingoFlow.Core.Models;
//using LingoFlow.Core;
//using AutoMapper;

//var builder = WebApplication.CreateBuilder(args);

//// הוספת CORS עם הרשאה לכל המקורות
//builder.Services.AddCors(options =>
//{
//    options.AddPolicy("AllowAllOrigins", policy =>
//    {
//        policy.AllowAnyOrigin()
//              .AllowAnyMethod()
//              .AllowAnyHeader();
//    });
//});
//builder.Services.AddDbContext<DataContext>();


//// רישום שירותים ל-DI
//builder.Services.AddScoped<IUserService, UserService>();
//builder.Services.AddScoped<IConversationService, ConversationService>();
//builder.Services.AddScoped<IFeedbackService, FeedbackService>();
//builder.Services.AddScoped<ITopicService, TopicService>();
//builder.Services.AddScoped<IWordService, WordService>();
//builder.Services.AddScoped<IAuthService, AuthService>();
//builder.Services.AddScoped<ITokenService, TokenService>();

//builder.Services.AddScoped<IUserRepository, UserRepository>();
//builder.Services.AddScoped<IConversationRepository, ConversationRepository>();
//builder.Services.AddScoped<IFeedbackRepository, FeedbackRepository>();
//builder.Services.AddScoped<ITopicRepository, TopicRepository>();
//builder.Services.AddScoped<IWordRepository, WordRepository>();
//builder.Services.AddScoped<IManagerRepository, ManagerRepository>();

//// הוספת בקרי API
//builder.Services.AddControllers();
//builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();

//// הגדרת AutoMapper
//builder.Services.AddAutoMapper(typeof(MappingProfile));

//// הגדרת JWT Authentication
//var jwtKey = builder.Configuration["Jwt:Key"];
//if (string.IsNullOrEmpty(jwtKey))
//{
//    throw new InvalidOperationException("JWT Key is missing from configuration.");
//}

//builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
//    .AddJwtBearer(options =>
//    {
//        options.TokenValidationParameters = new TokenValidationParameters
//        {
//            ValidateIssuer = true,
//            ValidateAudience = true,
//            ValidateLifetime = true,
//            ValidateIssuerSigningKey = true,
//            ValidIssuer = builder.Configuration["Jwt:Issuer"],
//            ValidAudience = builder.Configuration["Jwt:Audience"],
//            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
//        };
//    });

//// הרשאות מבוסס-תפקידים
//builder.Services.AddAuthorization(options =>
//{
//    options.AddPolicy("AdminOnly", policy => policy.RequireRole("Admin")); // למנהלים בלבד
//    options.AddPolicy("UserOnly", policy => policy.RequireRole("User")); // למשתמשים בלבד
//    options.AddPolicy("AdminOrUser", policy => policy.RequireRole("Admin", "User")); // לשני התפקידים
//});

//// יצירת אפליקציה
//var app = builder.Build();

//// הפעלת Swagger רק בסביבת פיתוח
//if (app.Environment.IsDevelopment())
//{
//    app.UseSwagger();
//    app.UseSwaggerUI();
//}

//// סדר נכון של ה-Middleware
//app.UseHttpsRedirection();
//app.UseCors("AllowAllOrigins");
//app.UseAuthentication();
//app.UseAuthorization();
//app.MapControllers();
//app.Run();
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore;
using System.Text;
using LingoFlow.Core.Services;
using LingoFlow.Service;
using LingoFlow.Core.Repositories;
using LingoFlow.Data.Repositories;
using LingoFlow.Data;
using LingoFlow.Core.Models;
using LingoFlow.Core;
using AutoMapper;
using DotNetEnv;

var builder = WebApplication.CreateBuilder(args);

// טוען את משתני הסביבה מקובץ .env
Env.Load();

// הוספת CORS עם הרשאה לכל המקורות
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});
builder.Services.AddDbContext<DataContext>();


// רישום שירותים ל-DI
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IConversationService, ConversationService>();
builder.Services.AddScoped<IFeedbackService, FeedbackService>();
builder.Services.AddScoped<ITopicService, TopicService>();
builder.Services.AddScoped<IWordService, WordService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<ITokenService, TokenService>();

builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IConversationRepository, ConversationRepository>();
builder.Services.AddScoped<IFeedbackRepository, FeedbackRepository>();
builder.Services.AddScoped<ITopicRepository, TopicRepository>();
builder.Services.AddScoped<IWordRepository, WordRepository>();
builder.Services.AddScoped<IManagerRepository, ManagerRepository>();

// הוספת בקרי API
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// הגדרת AutoMapper
builder.Services.AddAutoMapper(typeof(MappingProfile));

// הגדרת JWT Authentication
var jwtKey = Environment.GetEnvironmentVariable("JWT__Key");
if (string.IsNullOrEmpty(jwtKey))
{
    throw new InvalidOperationException("JWT Key is missing from configuration.");
}

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = Environment.GetEnvironmentVariable("JWT__Issuer"),
            ValidAudience = Environment.GetEnvironmentVariable("JWT__Audience"),
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
        };
    });

// הרשאות מבוסס-תפקידים
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminOnly", policy => policy.RequireRole("Admin")); // למנהלים בלבד
    options.AddPolicy("UserOnly", policy => policy.RequireRole("User")); // למשתמשים בלבד
    options.AddPolicy("AdminOrUser", policy => policy.RequireRole("Admin", "User")); // לשני התפקידים
});

// יצירת אפליקציה
var app = builder.Build();

// הפעלת Swagger רק בסביבת פיתוח
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// סדר נכון של ה-Middleware
app.UseHttpsRedirection();
app.UseCors("AllowAllOrigins");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();
