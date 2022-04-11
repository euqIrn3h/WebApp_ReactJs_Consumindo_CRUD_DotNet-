using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAppSistemaLocacao.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClienteController : ControllerBase
    {

        private readonly DataContext _context;

        public ClienteController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Cliente>>> Get()
        {
            return Ok(await _context.Clientes.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Cliente>> Get(int id)
        {
            var cliente = await _context.Clientes.FindAsync(id);
            if (cliente == null)
                return BadRequest("Cliente nao encontrado!");
            return Ok(cliente);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] Cliente cliente)
        {
            _context.Clientes.Add(cliente);
            await _context.SaveChangesAsync();
            return Ok(await _context.Clientes.ToListAsync());
        }

        [HttpPut]
        public async Task<ActionResult> Put([FromBody] Cliente request)
        {
            var cliente = await _context.Clientes.FindAsync(request.Id);
            if (cliente == null)
                return BadRequest("Cliente nao encontrado!");

            cliente.Nome = request.Nome;
            cliente.CPF = request.CPF;
            cliente.DataNascimento = request.DataNascimento;

            await _context.SaveChangesAsync();

            return Ok(await _context.Clientes.FindAsync(request.Id));
        }

        [HttpDelete]
        public async Task<ActionResult> Delete(int id)
        {
            var cliente = await _context.Clientes.FindAsync(id);
            if (cliente == null)
                return BadRequest("Cliente nao encontrado!");

            _context.Clientes.Remove(cliente);
            await _context.SaveChangesAsync();

            return Ok(await _context.Clientes.ToListAsync());

        }
    }

}

