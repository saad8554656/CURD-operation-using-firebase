import React from "react";
import { Container, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { auth, provider, db } from "../firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function Login() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log("Submitted data:", data);
    reset();
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Store user data in Firestore
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
        lastLogin: new Date().toISOString(),
      });

      console.log("Google Sign-In successful and data saved:", user);
    } catch (error) {
      console.error("Error with Google Sign-In:", error.message);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center mt-5">
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "20px",
          border: "1px solid #ced4da",
          borderRadius: "8px",
          backgroundColor: "white",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1
          className="text-center"
          style={{
            fontSize: "35px",
            marginBottom: "30px",
            fontWeight: "bold",
            color: "#343a40",
          }}
        >
          Login
        </h1>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              isInvalid={!!errors.email}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
              isInvalid={!!errors.password}
            />
          </Form.Group>

          <Button
            variant="dark"
            type="submit"
            className="w-100"
            style={{ marginTop: "15px", padding: "10px" }}
          >
            Login
          </Button>

          <Button
            variant="outline-primary"
            onClick={handleGoogleSignIn}
            className="w-100 mt-3"
            style={{ padding: "10px" }}
          >
            Sign in with Google
          </Button>

          <p style={{ marginTop: "15px", textAlign: "center" }}>
            Don't have an account? <Link to="/register">Sign Up</Link>
          </p>
        </Form>
      </div>
    </Container>
  );
}
