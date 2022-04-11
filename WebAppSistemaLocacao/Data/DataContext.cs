using System.ComponentModel.DataAnnotations;

namespace WebAppSistemaLocacao.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Cliente> Clientes { get; set; }
        public DbSet<Filme> Filmes { get; set; }
        public DbSet<Locacao> Locacoes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Locacao>()
                .HasOne<Cliente>()
                .WithMany()
                .HasForeignKey(p => p.Id_Cliente);

            modelBuilder.Entity<Locacao>()
                .HasOne<Filme>()
                .WithMany()
                .HasForeignKey(p => p.Id_Filme);
        }

    }

    public class Cliente
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Necessário colocar o nome")]
        [StringLength(maximumLength: 200)]
        public string Nome { get; set; } = string.Empty;

        [Required(ErrorMessage = "Necessário colocar CPF")]
        [StringLength(maximumLength: 11)]
        public string CPF { get; set; } = string.Empty;

        public DateTime? DataNascimento { get; set; }
    }

    public class Filme
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Necessário titulo")]
        [StringLength(maximumLength:100)]
        public string Titulo { get; set; } = string.Empty;

        public int ClassificacaoIndicativa { get; set; }
        [Required(ErrorMessage = "Necessario declarar se é lancamento")]
        public bool Lancamento { get; set; } = false;
    }

    public class Locacao
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Necessario Cliente")]
        public int Id_Cliente { get; set; }

        [Required(ErrorMessage = "Necessario Filme")]
        public int Id_Filme { get; set; }

        public DateTime DataLocacao { get; set; }

        
        public Nullable<DateTime> DataDevolucao { get; set; }
    }
}
