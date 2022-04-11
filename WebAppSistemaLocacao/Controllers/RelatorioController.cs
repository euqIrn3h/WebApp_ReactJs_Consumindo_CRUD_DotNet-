using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Globalization;
using System.Linq;

namespace WebAppSistemaLocacao.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RelatorioController : ControllerBase
    {

        private readonly DataContext _context;

        public RelatorioController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("clientesematraso")]
        public async Task<ActionResult<List<Cliente>>> GetClienteEmAtraso()
        {
            var listaCliente = new List<Cliente>();
            var listaLocacoes = await _context.Locacoes.ToListAsync();

            if (listaLocacoes == null)
                return BadRequest("Sem Locacoes");

            foreach (Locacao locacao in listaLocacoes)
            {

                if (locacao.DataDevolucao == null)
                {
                    var filme = await _context.Filmes.FindAsync(locacao.Id_Filme);
                    if (filme.Lancamento)
                    {
                        if (locacao.DataLocacao.AddDays(2).CompareTo(DateTime.Now) < 0)
                        {
                            var cliente = await _context.Clientes.FindAsync(locacao.Id_Cliente);
                            if (!listaCliente.Contains(cliente))
                                listaCliente.Add(cliente);
                        }
                    }
                    else
                    {
                        if (locacao.DataLocacao.AddDays(3).CompareTo(DateTime.Now) < 0)
                        {
                            var cliente = await _context.Clientes.FindAsync(locacao.Id_Cliente);
                            if (!listaCliente.Contains(cliente))
                                listaCliente.Add(cliente);
                        }
                    }
                }
                else
                {
                    var filme = await _context.Filmes.FindAsync(locacao.Id_Filme);
                    if (filme.Lancamento)
                    {
                        if (locacao.DataLocacao.AddDays(2).CompareTo(DateTime.Now) < 0 && locacao.DataLocacao.AddDays(2) <= locacao.DataDevolucao)
                        {
                            var cliente = await _context.Clientes.FindAsync(locacao.Id_Cliente);
                            if (!listaCliente.Contains(cliente))
                                listaCliente.Add(cliente);
                        }
                    }
                    else
                    {
                        if (locacao.DataLocacao.AddDays(3).CompareTo(DateTime.Now) < 0 && locacao.DataLocacao.AddDays(2) <= locacao.DataDevolucao)
                        {
                            var cliente = await _context.Clientes.FindAsync(locacao.Id_Cliente);
                            if (!listaCliente.Contains(cliente))
                                listaCliente.Add(cliente);
                        }
                    }
                }

            }

            return Ok(listaCliente);
        }

        [HttpGet("filmesnuncaalugados")]
        public async Task<ActionResult<List<Filme>>> GetFilmesNuncaAlugados()
        {
            var listaFilme = await _context.Filmes.ToListAsync();
            var listaLocacoes = await _context.Locacoes.ToListAsync();
            var filmesAlugados = new List<int>();
            var filmesNuncaAlugados = new List<Filme>();

            if (listaFilme == null)
                return BadRequest("Nenhum filme cadastrado");
            if (listaLocacoes == null)
                return BadRequest("Nenhum filme alugado");

            listaFilme.ForEach(filme =>
            {
                foreach (Locacao locacao in listaLocacoes)
                {
                    if (filme.Id == locacao.Id_Filme)
                    {
                        filmesAlugados.Add(filme.Id);
                        break;
                    }
                }
            });


            listaFilme.ForEach(filme =>
            {
                if (!filmesAlugados.Contains(filme.Id))
                    filmesNuncaAlugados.Add(filme);
            });

            return Ok(filmesNuncaAlugados);

        }

        [HttpGet("cincofilmesmaisalugadosdoultimoano")]
        public async Task<ActionResult<List<Filme>>> GetCincoFilmes()
        {
            var locacoes = await _context.Locacoes.ToListAsync();
            var filmes = await _context.Filmes.ToListAsync();
            var listaFilmeAnoPassado = new List<int>();
            var listaId = new List<ObjetoFilme>();
            var listaFilme = new List<Filme>();


            if (locacoes == null)
                return BadRequest("Nenhum filme alugado");

            foreach (var locacao in locacoes)
            {
                if (DateTime.Now.Year - 1 == locacao.DataLocacao.Year)
                    listaFilmeAnoPassado.Add(locacao.Id_Filme);
            }


            filmes.ForEach(filme =>
            {
                var i = 0;
                foreach (int id in listaFilmeAnoPassado)
                {
                    if (filme.Id == id)                  
                        i++;
                }
                if (i > 0)
                {
                    ObjetoFilme objeto = new ObjetoFilme();
                    objeto.count = i;
                    objeto.objeto = filme;
                    listaId.Add(objeto);
                }

            });

            IEnumerable<ObjetoFilme> array = listaId.OrderByDescending(x => x.count);

            var i=0;
            foreach(ObjetoFilme obj in array)
            {
                if (i > 4)
                    break;
                listaFilme.Add(obj.objeto);
                i++;
            }

            return Ok(listaFilme);

        }

        [HttpGet("tresmenosalugadosultimasemana")]
        public async Task<ActionResult<List<Filme>>> GetMenosAlugados()
        {
            var filmes = await _context.Filmes.ToListAsync();
            var locacoes =await _context.Locacoes.ToListAsync();
            var listaAlugadosSemanaPassada = new List<int>();
            var listaId = new List<ObjetoFilme>();
            var listaFilme = new List<Filme>();

            CultureInfo myCI = new CultureInfo("pt-BR");
            CalendarWeekRule myCWR = myCI.DateTimeFormat.CalendarWeekRule;
            DayOfWeek myFirstDOW = myCI.DateTimeFormat.FirstDayOfWeek;
            Calendar myCal = myCI.Calendar;

            if (locacoes == null)
                return BadRequest("Nenhum filme alugado");

            foreach (var locacao in locacoes)
            {
                if(myCal.GetWeekOfYear(DateTime.Now, myCWR, myFirstDOW) - 1 == myCal.GetWeekOfYear(locacao.DataLocacao, myCWR, myFirstDOW))
                    listaAlugadosSemanaPassada.Add(locacao.Id_Filme);
            }

            filmes.ForEach(filme =>
            {
                var i =0;
                foreach (int id in listaAlugadosSemanaPassada)
                {
                    if(filme.Id == id)
                        i++;
                }
                ObjetoFilme objeto = new ObjetoFilme();
                objeto.count = i;
                objeto.objeto = filme;
                listaId.Add(objeto);

            });

            IEnumerable<ObjetoFilme> array = listaId.OrderBy(x => x.count);

            var i = 0;
            foreach (ObjetoFilme obj in array)
            {
                if (i > 2)
                    break;
                listaFilme.Add(obj.objeto);
                i++;
            }

            return Ok(listaFilme);
        }

        [HttpGet("osegundoclientequemaisalugou")]
        public async Task<ActionResult<Cliente>> GetSegundoCliente()
        {
            var locacoes = await _context.Locacoes.ToListAsync();
            var clientes = await _context.Clientes.ToListAsync();
            var listaClientesIds = new List<int>();
            var listaId = new List<ObjetoCliente>();
            var listaClientes = new List<Cliente>();

            if (locacoes == null)
                return BadRequest("Nenhum filme alugado");

            foreach (var locacao in locacoes)
                listaClientesIds.Add(locacao.Id_Cliente);

            clientes.ForEach(cliente =>
            {
                var i=0;
                foreach (int id in listaClientesIds)
                {
                    if (cliente.Id == id)
                        i++;
                }
                if (i > 0)
                {
                    ObjetoCliente objeto = new ObjetoCliente();
                    objeto.count = i;
                    objeto.objeto = cliente;
                    listaId.Add(objeto);
                }
            });

            IEnumerable<ObjetoCliente> array = listaId.OrderByDescending(x => x.count);

            var i = 0;
            foreach (ObjetoCliente obj in array)
            {
                if (i > 2)
                    break;
                listaClientes.Add(obj.objeto);
                i++;
            }

            return Ok(listaClientes[1]);
        }
        
    }

    public class ObjetoFilme
    {

        public int count { get; set; }
        public Filme objeto { get; set; }
    }

    public class ObjetoCliente
    {

        public int count { get; set; }
        public Cliente objeto { get; set; }
    }
}
