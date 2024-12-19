import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Card, Form, Button, Spinner } from 'react-bootstrap';
import { FaStepBackward  } from "react-icons/fa";
const API_URL = "https://localhost:7213/api/Student/";

const Details = () => {
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

  return (
    <>
      {spinner && <div style={{ position: 'fixed', top: '0', left: '0', right: '0', bottom: '0', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.2)', zIndex: '99' }}><Spinner animation='border' /></div>}

      <Card className='width'>
        <Card.Header>DETAILS</Card.Header>
        <Card.Body>
          <Card.Title>{student.name}</Card.Title>
          <Card.Text>
            {student ? (
              <div className="row">
                <div className="col-md-6 text-end">
                  <p>Class</p>
                  <p>DOB</p>
                  <p>Gender</p>
                </div>
                <div className="col-md-6 text-start mb-3">
                  <p><strong>{student.class?.name || "Unknown"}</strong></p>
                  <p><strong>{new Date(student.dob).toLocaleDateString()}</strong></p>
                  <p><strong>{student.gender === 1 ? "Male" : "Female"}</strong></p>
                </div>
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </Card.Text>
          <Card.Footer>
            <Link to="/" className="primary"><FaStepBackward /> Back</Link>
          </Card.Footer>
        </Card.Body>
      </Card>

    </>
  );
};

export default Details;
