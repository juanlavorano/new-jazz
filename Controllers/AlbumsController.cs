using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using New_Jazz.Models;
using New_Jazz.Data;
using System.Collections.Generic;
using System.Linq;

namespace New_Jazz.AlbumsController
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlbumsController : ControllerBase
    {
        private AlbumsContext _context;

        public AlbumsController(AlbumsContext context)
        {
            _context = context;

        }

        [HttpGet]
        [Route("album")]
        public int GetRandomAlbum()
        {
            var albums = _context.Albums.ToList();
            var n = albums.Count();

            return n;
        }

        [HttpGet]
        [Route("test")]
        public ActionResult GetOk()
        {
            return Ok();
        }

    }
}