import { useEffect } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

let navigate = useNavigate();
useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged((user) => {
    if (user) {
      console.log("User logged in:", user);
      navigate("/show-user", { replace: true });
    }
  });
  return () => unsubscribe();
}, []);
