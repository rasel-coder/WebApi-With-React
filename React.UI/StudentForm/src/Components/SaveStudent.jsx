import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Form, Button, Spinner } from 'react-bootstrap';
const API_URL = "https://localhost:7213/api/Student/";

const SaveStudent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [classes, setClasses] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [student, setStudent] = useState({
    id: "00000000-0000-0000-0000-000000000000",
    name: "",
    gender: "",
    dob: "",
    classId: "",
  });
  
  useEffect(() => {
    if (location.state?.student) {
      const studentData = location.state.student;
      setStudent({
        ...studentData,
        dob: studentData.dob.split("T")[0],
      });
    }
  }, [location.state]);
  
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch(`${API_URL}GetClasses`);
        if (response.ok) {
          const data = await response.json();
          setClasses(data);
        } else {
          console.error("Failed to fetch classes");
        }
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };
    fetchClasses();
  }, []);

  const handleStudentChange = (event) => {
    const { name, value } = event.target;
    setStudent((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveStudent = async (event) => {
    event.preventDefault();
    setSpinner(true);

    try {
      const response = await fetch(`${API_URL}SaveStudent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...student,
          gender: parseInt(student.gender),
          classId: parseInt(student.classId),
        }),
      });

      if (response.ok) {
        console.log("Student saved successfully!");
        setSpinner(false);
        navigate("/");
      } else {
        console.error("Failed to save student");
        setSpinner(false);
      }
    } catch (error) {
      console.error("Error saving student:", error);
      setSpinner(false);
    }
  };

  return (
    <>
      {spinner && <div style={{ position: 'fixed', top: '0', left: '0', right: '0', bottom: '0', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.2)', zIndex: '99' }}><Spinner animation='border' /></div>}

      <h3>{student.id.toString() != "00000000-0000-0000-0000-000000000000" ? "EDIT STUDENT" : "ADD STUDENT"}</h3><hr />
      <Form onSubmit={handleSaveStudent} className='text-start width'>
        <Form.Group className="input-box">
          <Form.Label>Username</Form.Label>
          <Form.Control name="name" placeholder="Full Name" value={student.name} onChange={handleStudentChange} required />
        </Form.Group>

        <Form.Group className="input-box">
          <Form.Label>Gender</Form.Label>
          <div>
            <Form.Check type="radio" label="Male" name="gender" value="1" checked={student.gender == "1"} onChange={handleStudentChange} required />
            <Form.Check type="radio" label="Female" name="gender" value="2" checked={student.gender == "2"} onChange={handleStudentChange} required />
          </div>
        </Form.Group>

        <Form.Group className="input-box">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control type="date" name="dob" value={student.dob} onChange={handleStudentChange} required />
        </Form.Group>

        <Form.Group className="input-box">
          <Form.Label>Class</Form.Label>
          <Form.Control as="select" name="classId" value={student.classId} onChange={handleStudentChange} required>
            <option value="">Select Class</option>
            {classes.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Link to="/" className="btn btn-sm btn-secondary mt-2 me-2">Back</Link>
        <Button variant="primary" className='btn btn-sm mt-2' type="submit">{student.Id ? "Update" : "Submit"}</Button>
      </Form>
    </>
  );
};

export default SaveStudent;
