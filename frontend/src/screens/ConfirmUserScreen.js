import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// import Message from "../components/Message";
import Loader from "../components/Loader";
import { confirmUser } from "../actions/userActions";
// import { motion } from "framer-motion"

const ConfirmUserScreen = ({ match }) => {
  const userToken = match.params.token;
  const dispatch = useDispatch();

  const userConfirm = useSelector((state) => state.userConfirm);
  const { loading, error, success } = userConfirm;

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(confirmUser(userToken));
  }, [dispatch, userToken]);

  return (
    <Container>
      <Row className="justify-content-md-center pt-2">
        {loading ? (
          <Loader />
        ) : (
          <Col>
            {error && (
              <h1 className="site-headline font-weight-bold mb-3 text-dark text-center text-uppercase">
                {error}
              </h1>
            )}
            {success && (
              <>
                <h1 className="site-headline font-weight-bold mb-3 text-dark text-center">
                  YOUR EMAIL HAS BEEN{" "}
                  <span className="hero-fancy-text">CONFIMED</span>. YOU CAN NOW
                  LOG IN
                </h1>
                <div className="text-center">
                  <Link to="/login" className="btn custom-btn-primary">
                    Log in
                  </Link>
                </div>
              </>
            )}
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default ConfirmUserScreen;
