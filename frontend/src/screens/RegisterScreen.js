import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { register } from "../actions/userActions";

const RegisterScreen = ({ history, location }) => {
  const [name, setName] = useState("");
  const [matricNumber, setMatricNumber] = useState("");
  const [lasuEmail, setLasuEmail] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, success, error, backendErrors } = userRegister;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  console.log(backendErrors)

  const redirect = location.search
    ? location.search.split("=")[1]
    : "/dashboard";

  useEffect(() => {
    window.scrollTo(0, 0);
    if (success) {
      history.push("/login");
    }
    if (userInfo) {
      history.push(redirect);
    }
    // if (userInfo && userInfo.isActive) {
    //   history.push(redirect);
    // }
  }, [history, success, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      register(
        name,
        matricNumber,
        lasuEmail,
        phoneNumber,
        gender,
        password,
        password2
      )
    );
  };

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}

      <Form onSubmit={submitHandler}>
        <Form.Row>
          <Form.Group as={Col} md="6" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              isInvalid={backendErrors && backendErrors.name}
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              {backendErrors && backendErrors.name}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="email">
            <Form.Label>Lasu Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your lasu email"
              value={lasuEmail}
              onChange={(e) => setLasuEmail(e.target.value)}
              isInvalid={backendErrors && backendErrors.lasuEmail}
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              {backendErrors && backendErrors.lasuEmail}
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} md="6" controlId="matricnumber">
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

          <Form.Group as={Col} md="6" controlId="phonenumber">
            <Form.Label>Student Phone Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              isInvalid={backendErrors && backendErrors.phoneNumber}
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              {backendErrors && backendErrors.phoneNumber}
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Form.Group controlId="gender">
          <Form.Label>Gender</Form.Label>
          <br />
          <div className="d-flex">
            <div className="radio">
              <label>
                <input
                  type="radio"
                  value="Male"
                  checked={gender === "Male"}
                  onChange={(e) => setGender(e.target.value)}
                />
                <span className="ml-2">Male</span>

              </label>
            </div>
            <div className="radio ml-3">
              <label>
                <input
                  type="radio"
                  value="Female"
                  checked={gender === "Female"}
                  onChange={(e) => setGender(e.target.value)}
                  className=""
                />
                <span className="ml-2">Female</span>
              </label>
            </div>
          </div>
          <Form.Control.Feedback className={backendErrors && backendErrors.gender ? "d-block" : null} type="invalid">
            {backendErrors && backendErrors.gender}
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
        <Form.Group controlId="password2">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            isInvalid={backendErrors && backendErrors.password2}
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            {backendErrors && backendErrors.password2}
          </Form.Control.Feedback>
        </Form.Group>
        <button type="submit" className="btn custom-btn-primary">
          <span style={{ width: '10px' }}>{loading && <Loader />}</span>
          Register
        </button>
      </Form>

      <Row className="py-3">
        <Col>
          Have an Account?
          <Link
            className="ml-1"
            to={redirect ? `/login?redirect=${redirect}` : "/login"}
          >
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
