using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAppSistemaLocacao.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocacaoController : ControllerBase
    {

        private readonly DataContext _context;

        public LocacaoController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Locacao>>> Get()
        {
            return Ok(await _context.Locacoes.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Locacao>> Get(int id)
        {
            var locacao = await _context.Locacoes.FindAsync(id);
            if (locacao == null)
                return BadRequest("Locacao nao encontrado!");
            return Ok(locacao);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] Locacao locacao)
        {
            var filme = await _context.Filmes.FindAsync(locacao.Id_Filme);
            if (filme == null)
                return BadRequest("Filme cadastrado nao existe");

            locacao.DataLocacao = DateTime.Now;

            _context.Locacoes.Add(locacao);
            await _context.SaveChangesAsync();
            return Ok(await _context.Locacoes.ToListAsync());
        }

        [HttpPut]
        public async Task<ActionResult> Put([FromBody] Locacao request)
        {
            var locacao = await _context.Locacoes.FindAsync(request.Id);
            if (locacao == null)
                return BadRequest("Locacao nao encontrado!");

            locacao.Id_Cliente = request.Id_Cliente;
            locacao.Id_Filme = request.Id_Filme;
            locacao.DataLocacao = request.DataLocacao;
            locacao.DataDevolucao = request.DataDevolucao;

            await _context.SaveChangesAsync();

            return Ok(await _context.Locacoes.FindAsync(request.Id));
        }

        [HttpDelete]
        public async Task<ActionResult> Delete(int id)
        {
            var locacao = await _context.Locacoes.FindAsync(id);
            if (locacao == null)
                return BadRequest("Locacao nao encontrada!");

            _context.Locacoes.Remove(locacao);
            await _context.SaveChangesAsync();

            return Ok(await _context.Locacoes.ToListAsync());

        }

     
    }
}

