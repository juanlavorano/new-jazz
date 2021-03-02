using Microsoft.EntityFrameworkCore;
using New_Jazz.Models;

namespace New_Jazz.Data
{
    public class UsersContext : DbContext
    {
        public UsersContext(DbContextOptions<UsersContext> opt) : base(opt)
        {
        }

        public DbSet<User> Users { get; set; }
    }
}