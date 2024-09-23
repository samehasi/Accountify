var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "AllowSpecificOrigins",
        policy =>
        {
            policy.WithOrigins("http://localhost:4200") // Allow Angular app's origin
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

var app = builder.Build();

// Use the CORS policy
app.UseCors("AllowSpecificOrigins");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
