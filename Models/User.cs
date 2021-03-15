using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace New_Jazz.Models
{
    public class User
    {
        [Key]
        public int user_id { get; set; }
        [Required]
        public string username { get; set; }
        [Required]
        public string password { get; set; }
        public string salt { get; set; }
        [Required]
        public string email { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
    }
}