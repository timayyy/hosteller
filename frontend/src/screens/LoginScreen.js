import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { login } from "../actions/userActions";
// import { motion } from "framer-motion"

const LoginScreen = ({ history, location }) => {
  const [matricNumber, setMatricNumber] = useState("");
  const [password, setPassword] = useState("");
  // const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo: userInfoRegister } = userRegister;

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, success, userInfo, backendErrors } = userLogin;

  const userConfirm = useSelector((state) => state.userConfirm);
  const { userInfo: userInfoConfirmed } = userConfirm;

  const redirect = location.search
    ? location.search.split("=")[1]
    : "/dashboard";

  useEffect(() => {
    window.scrollTo(0, 0);
    if (success) {
      history.push(redirect);
    }
    if (userInfo) {
      history.push(redirect);
    }
    // if (userInfo && userInfo.isActive) {
    //   history.push(redirect);
    // }
    // if (userInfoRegister && !userInfoRegister.isActive) {
    //   setMessage("An email has been sent. Please verify your email");
    // }

    // if (userInfoConfirmed && userInfoConfirmed.isActive) {
    //   setMessage("You can now log in");
    // }
  }, [
    history,
    success,
    redirect,
    userInfo,
    userInfoConfirmed,
    userInfoRegister,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(matricNumber, password));
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant="danger">{error}</Message>}
      {/* {message && <Message variant="info">{message}</Message>} */}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="matricnumber">
          <Form.Label>Matric Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your matric number"
            value={matricNumber}
            onChange={(e) => setMatricNumber(e.target.value)}
            isInvalid={backendErrors && backendErrors.matricNumber}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            {backendErrors && backendErrors.matricNumber}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isInvalid={backendErrors && backendErrors.password}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            {backendErrors && backendErrors.password}
          </Form.Control.Feedback>
        </Form.Group>
        <button type="submit" className="btn custom-btn-primary">
          Sign In
        </button>
      </Form>

      <Row className="py-3">
        <Col>
          Not yet a member?{" "}
          <Link
            to={redirect ? `/signup?redirect=${redirect}` : "/signup"}
            className="ml-l"
          >
            Sign up here
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
