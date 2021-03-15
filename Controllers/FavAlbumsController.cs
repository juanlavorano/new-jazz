using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using New_Jazz.Data;
using New_Jazz.Models;

namespace New_Jazz.AlbumsController
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavAlbumsController : ControllerBase
    {
        private FavAlbumsContext _context;

        public FavAlbumsController(FavAlbumsContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Route("add")]
        public async Task<ActionResult<FavAlbum>> AddFavAlbum([FromBody] FavAlbum favAlbum)
        {
            FavAlbum album = new FavAlbum()
            {
                spotify_id = favAlbum.spotify_id,
                user_id = favAlbum.user_id
            };

            _context.FavAlbums.Add(album);
            await _context.SaveChangesAsync();
            return Ok("Album added to Favourites");
        }

        [HttpDelete("remove")]
        public async Task<ActionResult<FavAlbum>> RemoveFavAlbum([FromBody] FavAlbum favAlbum)
        {
            var album = _context.FavAlbums
                        .Where(a => a.spotify_id == favAlbum.spotify_id && a.user_id == favAlbum.user_id)
                        .SingleOrDefault();


            _context.FavAlbums.Remove(album);
            await _context.SaveChangesAsync();
            return Ok("Album removed");
        }

        [HttpGet("get-fav")]
        public ActionResult<FavAlbum> GetFav([FromQuery] FavAlbum favAlbum)
        {
            var album = _context.FavAlbums
                        .Where(a => a.spotify_id == favAlbum.spotify_id & a.user_id == favAlbum.user_id)
                        .SingleOrDefault();

            if (album == null)
            {
                return NotFound("Album not found");
            }

            return Ok("Album found");
        }


        [HttpGet]
        [Route("get-all")]
        public ActionResult<FavAlbum> GetAllFavs([FromQuery] int user_id)
        {
            var favAlbums = _context.FavAlbums
                            .Where(a => a.user_id == user_id)
                            .ToList();

            return Ok(favAlbums);
        }

    }
}