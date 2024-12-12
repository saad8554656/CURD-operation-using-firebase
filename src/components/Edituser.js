import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from '../firebaseConfig';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

export default function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "users", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setData(docSnap.data());
      }
    };
    fetchData();
  }, [id]);

  const myfunction = async (values) => {
    const docRef = doc(db, "users", id);
    await updateDoc(docRef, values);
    navigate("/show-user");
  };

    return (
        <Container className="my-5">
            <h1 className="text-center mb-4" style={{ fontWeight: 'bold', color: '#343a40' }}>Update User Information</h1>
            <Form onSubmit={handleSubmit(myfunction)} className="p-4 shadow-sm" style={{ borderRadius: '8px', backgroundColor: '#f8f9fa' }}>
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                defaultValue={data.name}
                                {...register("name", { required: "Name is required", minLength: { value: 4, message: "Name must be at least 4 characters" } })}
                                type="text"
                                placeholder="Enter Name"
                                isInvalid={!!errors.name}
                            />
                            <Form.Control.Feedback type="invalid">{errors.name?.message}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formMobile">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                defaultValue={data.mobile}
                                {...register("mobile", { required: "Mobile number is required", pattern: { value: /^[0-9]{10}$/, message: "Mobile number must be 10 digits" } })}
                                type="text"
                                placeholder="Enter Phone Number"
                                isInvalid={!!errors.mobile}
                            />
                            <Form.Control.Feedback type="invalid">{errors.mobile?.message}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                defaultValue={data.email}
                                {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } })}
                                type="email"
                                placeholder="Enter Email"
                                isInvalid={!!errors.email}
                            />
                            <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                defaultValue={data.password}
                                {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
                                type="password"
                                placeholder="Enter Password"
                                isInvalid={!!errors.password}
                            />
                            <Form.Control.Feedback type="invalid">{errors.password?.message}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="formCPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                defaultValue={data.cpassword}
                                {...register("cpassword", { required: "Confirm Password is required", validate: value => value === watch("password") || "Passwords do not match" })}
                                type="password"
                                placeholder="Confirm Password"
                                isInvalid={!!errors.cpassword}
                            />
                            <Form.Control.Feedback type="invalid">{errors.cpassword?.message}</Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>

                <Button type="submit" variant="dark" className="w-100 mt-3">Update</Button>
            </Form>
            <p className="text-center mt-4">
                <Link to={`/login`} className="home-link" style={{ color: 'black', textDecoration: 'none', fontWeight: 'bold', fontSize:'50px'  }}>Home</Link>
            </p>
        </Container>
    );
}
