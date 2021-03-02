using System.ComponentModel.DataAnnotations;

namespace New_Jazz.Models
{
    public class User
    {
        [Key]
        public int ID { get; set; }
        [Required]
        public string username { get; set; }
        [Required]
        public string password { get; set; }
        [Required]
        public string email { get; set; }
        // public string firstName { get; set; }
        // public string lastName { get; set; }
    }
}