import React, { useEffect, useState } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

export default function Showuser() {
  const navigate = useNavigate()
  const [api, setApi] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const users = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setApi(users);
    };
    fetchUsers();
  }, []);

  const deleteData = async (id) => {
    await deleteDoc(doc(db, "users", id));
    setApi(prevApi => prevApi.filter(user => user.id !== id));
  };

  return (
    <Container className="my-4">
      <h1 className="text-center mb-4" style={{ color: 'White', fontWeight: 'bold' , borderBottom:"3px solid white" }}>User Data</h1>
      <Table striped bordered hover responsive className="table-container shadow">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {api && api.length > 0 && api.map(({ name, email, mobile, id }) => (
            <tr key={id}>
              <td>{name}</td>
              <td>{mobile}</td>
              <td>{email}</td>
              <td>
                <Link to={`/edit-user/${id}`} className="btn btn-primary btn-sm mx-1">
                  Edit
                </Link>
              </td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => deleteData(id)}
                  className="mx-1"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <p className="text-center mt-4">
                <Link to="/login" className="home-link" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize:'50px'  }}>Home
                </Link>
      </p>
    </Container>
  );
}
