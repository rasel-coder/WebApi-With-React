using System.ComponentModel.DataAnnotations;

namespace StudentForm.Data;

public class Student
{
    [Key]
    public Guid id { get; set; }
    public string? name { get; set; }
    public int gender { get; set; }
    public DateTime dob { get; set; }
    public int classId { get; set; }
    public DateTime createdDate { get; set; }
    public DateTime modificationDate { get; set; }

    public virtual Class? Class { get; set; }
}
