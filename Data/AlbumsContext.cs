using Microsoft.EntityFrameworkCore;
using New_Jazz.Models;

namespace New_Jazz.Data
{
    public class AlbumsContext : DbContext
    {
        public AlbumsContext(DbContextOptions<AlbumsContext> opt) : base(opt)
        {
        }

        public DbSet<Album> Albums { get; set; }
    }
}