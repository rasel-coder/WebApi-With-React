using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentForm.Data;

namespace StudentForm.Controllers;

[Route("api/[controller]/[action]")]
[ApiController]
public class StudentController : ControllerBase
{
    public StudentEntities _context { get; set; }

    public StudentController(StudentEntities _context)
    {
        this._context = _context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Class>>> GetClasses()
    {
        return await _context.Classes.ToListAsync();
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Student>>> GetStudents()
    {
        return await _context.Students.Include(x => x.Class).OrderBy(x => x.id).ToListAsync();
    }

    [HttpPost]
    public async Task<ActionResult> SaveStudent([FromBody] Student model)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        if (model.id.ToString() == "00000000-0000-0000-0000-000000000000")
        {
            model.id = Guid.NewGuid();
            model.createdDate = DateTime.UtcNow;
            model.modificationDate = DateTime.UtcNow;
            await _context.Students.AddAsync(model);
        }
        else
        {
            Student student = await _context.Students.FirstOrDefaultAsync(x => x.id == model.id);
            
            if (student != null)
            {
                student.id = model.id;
                student.name = model.name;
                student.gender = model.gender;
                student.dob = model.dob;
                student.classId = model.classId;
                student.createdDate = DateTime.UtcNow;
                student.modificationDate = DateTime.UtcNow;
                _context.Students.Update(student);
            }
        }
        await _context.SaveChangesAsync();
        return Ok();
    }

    [HttpPost]
    public async Task<ActionResult> DeleteStudent([FromBody] Guid id)
    {
        Student student = await _context.Students.FirstOrDefaultAsync(x => x.id == id);
        if (student != null)
        {
            _context.Students.Remove(student);
            await _context.SaveChangesAsync();
            return Ok();
        }
        return NotFound();
    }
}
