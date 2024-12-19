
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Modal, Button } from "react-bootstrap";
import { FaInfo, FaEdit, FaTrash, FaPlus  } from "react-icons/fa";
const API_URL = "https://localhost:7213/api/Student/";


const StudentList = () => {
    const navigate = useNavigate();  
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await fetch(`${API_URL}GetStudents`);
                if (response.ok) {
                    const data = await response.json();
                    setStudents(data);
                } else {
                    console.error("Failed to fetch students");
                }
            } catch (error) {
                console.error("Error fetching students:", error);
            }
        };
        fetchStudents();
    }, []);

    const handleEdit = (student) => {
      navigate('/SaveStudent', { state: { student } });
    };

    const handleDetails = (student) => {
      navigate('/Details', { state: { student } });
    };

    const [show, setShow] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);

    const handleShow = (student) => {
        setSelectedStudent(student);
        setShow(true);
    };

    const handleClose = () => {
        setSelectedStudent(null);
        setShow(false);
    };

    const confirmDelete = async () => {
        if (selectedStudent) {
            try {
                const response = await fetch(`${API_URL}DeleteStudent`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(selectedStudent.id),
                });
          
                if (response.ok) {
                  console.log("Student deleted successfully!");
                  window.location.reload();
                } else {
                  console.error("Failed to delete student");
                }
              } catch (error) {
                console.error("Error deleting student:", error);
              }
        }
        handleClose();
    };

    return (
        <>
            <div className='d-flex justify-content-between'>
                <h3>STUDENT LIST</h3>
                <div className='d-flex align-items-center'>
                    <Link to="/SaveStudent" className="btn btn-primary"><FaPlus /> Add New Student</Link>
                </div>
            </div> <hr />
            <table className="table width">
                <thead>
                    <tr>
                        <th>NO</th>
                        <th className='text-start'>Name</th>
                        <th>Class</th>
                        <th>DOB</th>
                        <th>Gender</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => (
                        <tr key={student.id}>
                            <td>{index + 1}</td>
                            <td className='text-start'>{student.name}</td>
                            <td>{student.class?.name || "Unknown"}</td>
                            <td>{new Date(student.dob).toLocaleDateString()}</td>
                            <td>{student.gender === 1 ? "Male" : "Female"}</td>
                            <td>
                                <button className='btn btn-sm btn-secondary' onClick={() => handleEdit(student)}><FaEdit className='icon' /></button> | {" "}
                                <button className='btn btn-sm btn-success' onClick={() => handleDetails(student)}><FaInfo className='icon' /></button> | {" "}
                                <button className='btn btn-sm btn-danger'onClick={() => handleShow(student)}><FaTrash className='icon' /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete{" "}
                    <strong>{selectedStudent?.name}</strong>? This action cannot be undone.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                    <Button variant="danger" onClick={confirmDelete}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default StudentList;