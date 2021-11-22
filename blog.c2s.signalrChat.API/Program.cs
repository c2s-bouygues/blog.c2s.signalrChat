using blog.c2s.signalrChat.Entities;
using blog.c2s.signalrChat.Hubs;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSignalR();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins("http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });

});
builder.Services.AddSingleton<IDictionary<string, UserConnection>>(opts => new Dictionary<string, UserConnection>());

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();

app.UseRouting();
app.UseCors();
app.UseEndpoints(endpoints =>
{
    endpoints.MapHub<ChatHub>("/hub");
});

//app.Lifetime.ApplicationStarted.Register(() =>
//{
//    var serviceProvider = app.Services;
//    var chatHub = serviceProvider.GetService<IHubContext<ChatHub>>();

//    if(chatHub != null)
//    {
//        var timer = new System.Timers.Timer(1000)
//        {
//            Enabled = true
//        };
//        timer.Elapsed += new ElapsedEventHandler((Object sender, ElapsedEventArgs e) =>
//        {
//            chatHub.Clients.All.SendAsync("setTime", DateTime.Now.ToString("HH:mm:ss - dd/MM/yyyy"));
//        });

//        timer.Start();
//    }
//});

app.Run();