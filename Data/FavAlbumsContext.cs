using Microsoft.EntityFrameworkCore;
using New_Jazz.Data;
using New_Jazz.Models;

namespace New_Jazz.Data
{
    public class FavAlbumsContext : DbContext
    {
        public FavAlbumsContext(DbContextOptions<FavAlbumsContext> opt) : base(opt)
        {
        }

        public DbSet<FavAlbum> FavAlbums { get; set; }
    }
}