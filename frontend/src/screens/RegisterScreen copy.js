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
  const [studentPhoneNumber, setStudentPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [faculty, setFaculty] = useState("Engineering");
  const [department, setDepartment] = useState("cpe");
  const [homeAddress, setHomeAddress] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [dadPhoneNumber, setDadPhoneNumber] = useState("");
  const [momPhoneNumber, setMomPhoneNumber] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, success, error } = userRegister;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const redirect = location.search
    ? location.search.split("=")[1]
    : "/dashboard";

  useEffect(() => {
    window.scrollTo(0, 0);
    if (success) {
      history.push("/login");
    }
    if (userInfo && userInfo.isActive) {
      history.push(redirect);
    }
  }, [history, success, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setMessage("Passwords do not match");
    } else {
      dispatch(
        register(
          name,
          matricNumber,
          lasuEmail,
          faculty,
          department,
          homeAddress,
          dateOfBirth,
          studentPhoneNumber,
          dadPhoneNumber,
          momPhoneNumber,
          password,
          password2
        )
      );
    }
  };

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Row>
          <Form.Group as={Col} md="6" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="email">
            <Form.Label>Lasu Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your lasu email"
              value={lasuEmail}
              onChange={(e) => setLasuEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} md="6" controlId="faculty">
            <Form.Label>Faculty</Form.Label>
            <Form.Control
              as="select"
              value={faculty}
              onChange={(e) => setFaculty(e.target.value)}
            >
              <option value="Engineering">Engineering</option>
              <option value="Agric">School of agriculture</option>
              <option value="Other">Other</option>
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="department">
            <Form.Label>Department</Form.Label>
            <Form.Control
              as="select"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option value="ece">Electronics and Computer Engineering</option>
              <option value="mech">Mechanical Engineering</option>
              <option value="cpe">Chemical and Polymer Engineering</option>
            </Form.Control>
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
            ></Form.Control>
          </Form.Group>
          <Form.Group as={Col} md="6" controlId="homeAddress">
            <Form.Label>Home Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your home address"
              value={homeAddress}
              onChange={(e) => setHomeAddress(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} md="4" controlId="studentphonenumber">
            <Form.Label>Student Phone Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your phone number"
              value={studentPhoneNumber}
              onChange={(e) => setStudentPhoneNumber(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="dadphonenumber">
            <Form.Label>Dad Phone Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your dad phone number"
              value={dadPhoneNumber}
              onChange={(e) => setDadPhoneNumber(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="momphonenumber">
            <Form.Label>Mom Phone Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your mom phone number"
              value={momPhoneNumber}
              onChange={(e) => setMomPhoneNumber(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Form.Row>
        <Form.Group controlId="dateofbirth">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password2">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <button type="submit" className="btn custom-btn-primary">
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
