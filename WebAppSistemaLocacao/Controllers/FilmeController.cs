using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAppSistemaLocacao.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FilmeController : ControllerBase
    {

        private readonly DataContext _context;

        public FilmeController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Filme>>> Get()
        {
            return Ok(await _context.Filmes.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Filme>> Get(int id)
        {
            var filme = await _context.Filmes.FindAsync(id);
            if (filme == null)
                return BadRequest("Cliente nao encontrado!");
            return Ok(filme);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] Filme filme)
        {
            _context.Filmes.Add(filme);
            await _context.SaveChangesAsync();
            return Ok(await _context.Filmes.ToListAsync());
        }

        [HttpPut]
        public async Task<ActionResult> Put([FromBody] Filme request)
        {
            var filme = await _context.Filmes.FindAsync(request.Id);
            if (filme == null)
                return BadRequest("Cliente nao encontrado!");

            filme.Titulo = request.Titulo;
            filme.Lancamento = request.Lancamento;
            filme.ClassificacaoIndicativa = request.ClassificacaoIndicativa;

            await _context.SaveChangesAsync();

            return Ok(await _context.Filmes.FindAsync(request.Id));
        }

        [HttpDelete]
        public async Task<ActionResult> Delete(int id)
        {
            var filme = await _context.Filmes.FindAsync(id);
            if (filme == null)
                return BadRequest("Cliente nao encontrado!");

            _context.Filmes.Remove(filme);
            await _context.SaveChangesAsync();

            return Ok(await _context.Filmes.ToListAsync());

        }
    }

}

