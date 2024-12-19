using Microsoft.EntityFrameworkCore;

namespace StudentForm.Data;

public class StudentEntities : DbContext
{
    public StudentEntities(DbContextOptions<StudentEntities> options)
            : base(options)
    { }

    public virtual DbSet<Student> Students { get; set; }
    public virtual DbSet<Class> Classes { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
    }
}
