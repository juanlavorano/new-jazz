using System.ComponentModel.DataAnnotations;

namespace New_Jazz.Models
{
    public class FavAlbum
    {
        public int user_id { get; set; }
        public string spotify_id { get; set; }
        [Key]
        public int fav_id { get; set; }
    }
}