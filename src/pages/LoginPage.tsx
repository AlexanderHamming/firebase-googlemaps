import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import { FirebaseError } from "firebase/app";
import useAuth from "../hooks/useAuth";
import { LoginCredentials } from "../types/User.types";
import "../assets/LoginPage.scss";

const LoginPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginCredentials>();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onLogin: SubmitHandler<LoginCredentials> = async (data) => {
    setIsSubmitting(true);
    try {
      await login(data.email, data.password);
      toast.success("🥂 logged in successfully!");
      navigate("/");
    } catch (err) {
      if (err instanceof FirebaseError) {
        toast.error(err.message);
      } else {
        toast.error("Something wierd happend here");
      }
    }
    setIsSubmitting(false);
  };

  return (
    <div className="login-container">
      <Form onSubmit={handleSubmit(onLogin)} className="login-form">
        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control placeholder="Enter your email here" type="email" {...register("email", { required: "Email is required" })} />
          {errors.email && <p className="invalid">{errors.email.message}</p>}
        </Form.Group>
        <Form.Group controlId="password" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Password must be at least 6 characters" },
            })}
          />
          {errors.password && <p className="invalid">{errors.password.message}</p>}
        </Form.Group>
        <Button disabled={isSubmitting} type="submit" className="login-button">
          {isSubmitting ? "Logging in..." : "Log In"}
        </Button>
      </Form>
    </div>
  );
};

export default LoginPage;
