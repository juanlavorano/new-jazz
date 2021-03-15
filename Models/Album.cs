using System.ComponentModel.DataAnnotations;

namespace New_Jazz.Models
{
    public class Album
    {
        [Key]
        public int Key { get; set; }
        public string Name { get; set; }
        public string Artist { get; set; }
    }
}