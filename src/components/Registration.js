import React from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { addDoc, collection } from "firebase/firestore";

export default function Registercomp() {
  let navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, watch } = useForm();

  const myfunction = async (value) => {
    await addDoc(collection(db, "users"), value);
    navigate("/show-user");
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '75vh' }}>
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: '30px',
          border: '1px solid #ced4da',
          borderRadius: '8px',
          backgroundColor: 'white',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h1 className="text-center mb-4" style={{ fontSize: '28px', color: '#343a40', fontWeight: 'bold' }}>Register Page</h1>
        <Form onSubmit={handleSubmit(myfunction)}>
          {/* Name Field */}
          <Form.Group controlId="formName">
            <Form.Label>Name :</Form.Label>
            <Form.Control
              {...register("name", { required: "Name is required", minLength: { value: 4, message: "Name must be at least 4 characters" } })}
              type='text'
              placeholder='Enter Name'
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            />
            {errors.name && <p className='alert alert-danger'>{errors.name.message}</p>}
          </Form.Group>

          {/* Mobile Field */}
          <Form.Group controlId="formMobile">
            <Form.Label>Phone Number :</Form.Label>
            <Form.Control
              {...register("mobile", { required: "Mobile number is required", pattern: { value: /^[0-9]{10}$/, message: "Mobile number must be 10 digits" } })}
              type='text'
              placeholder='Enter Phone Number'
              className={`form-control ${errors.mobile ? 'is-invalid' : ''}`}
            />
            {errors.mobile && <p className='alert alert-danger'>{errors.mobile.message}</p>}
          </Form.Group>

          {/* Email Field */}
          <Form.Group controlId="formEmail">
            <Form.Label>Email :</Form.Label>
            <Form.Control
              {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" } })}
              type='email'
              placeholder='Enter Email Id'
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            />
            {errors.email && <p className='alert alert-danger'>{errors.email.message}</p>}
          </Form.Group>

          {/* Password Field */}
          <Form.Group controlId="formPassword">
            <Form.Label>Password :</Form.Label>
            <Form.Control
              {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
              type='password'
              placeholder='Enter Password'
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            />
            {errors.password && <p className='alert alert-danger'>{errors.password.message}</p>}
          </Form.Group>

          {/* Confirm Password Field */}
          <Form.Group controlId="formCPassword">
            <Form.Label>Confirm Password :</Form.Label>
            <Form.Control
              {...register("cpassword", { required: "Confirm Password is required", validate: value => value === watch("password") || "Passwords do not match" })}
              type='password'
              placeholder='Confirm Password'
              className={`form-control ${errors.cpassword ? 'is-invalid' : ''}`}
            />
            {errors.cpassword && <p className='alert alert-danger'>{errors.cpassword.message}</p>}
          </Form.Group>

          <Button type='submit' variant="dark" className="mt-3 w-100">Register</Button>
        </Form>
      </div>
    </Container>
  );
}
