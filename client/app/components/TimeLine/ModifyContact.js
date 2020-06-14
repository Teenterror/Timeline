import React, { Component } from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure({
  autoClose: 3000,
  draggable: false,
});

export default class ModifyContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contactName: this.props.contactObj.name,
      city: this.props.contactObj.city,
      email: this.props.contactObj.email,
      phoneNumber: this.props.contactObj.phoneNumber[0],
      additionalInfo: this.props.contactObj.additionalInfo,
      validated: false,
      loader: false,
    };
    console.log("this.props.contactObj.phoneNumber", this.props.contactObj.phoneNumber);
  }

  handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    this.setValidated(true);
    let isValid = this.checkOtherFieldsValidation();
    if (isValid) {
      this.updateContact();
    } else {
      toast.error("Email is invalid!!!. Correct and try again");
    }
  };

  checkOtherFieldsValidation = () => {
    let { contactName, email, phoneNumber, city } = this.state;
    if (email !== "") {
      return this.validateEmail();
    }
    return true;
  };

  validateEmail = () => {
    const { email } = this.state;
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(email).toLowerCase())) {
      return true;
    } else {
      return false;
    }
  };

  setValidated = (value) => {
    this.setState({
      validated: value,
    });
  };

  updateContact = () => {
    let { contactName, email, phoneNumber, city, additionalInfo } = this.state;
    this.setState({
      loader: true,
    });
    fetch("/api/updateContact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: this.props.contactObj._id,
        contactName,
        city,
        email,
        phoneNumber,
        additionalInfo,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        if (!response) {
          console.error("An error occured while adding contact");
          Swal.fire({
            icon: "error",
            title: "An error occured while updating Contact",
            showConfirmButton: true,
            timer: 1500,
          });
        } else {
          console.log("contact added successfully");
          Swal.fire({
            icon: "success",
            title: "Contact updated successfully",
            showConfirmButton: true,
            timer: 1500,
          });
          console.log(response);
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Something went wrong, Try again later.",
          showConfirmButton: true,
          timer: 1500,
        });
      })
      .finally(() => {
        this.setState({
          loader: false,
        });
        this.setValidated(false);
        this.props.updatedContacts();
      });
  };

  setContactName = (e) => {
    this.setState({ contactName: e.target.value });
  };

  setEmail = (e) => {
    this.setState({ email: e.target.value });
  };

  setPhoneNumber = (phoneNumber) => {
    this.setState({ phoneNumber });
  };

  setAdditionalInfo = (e) => {
    this.setState({ additionalInfo: e.target.value });
  };

  setCity = (e) => {
    this.setState({ city: e.target.value });
  };

  handleReset = () => {
    this.setState({
      contactName: "",
      city: "",
      email: "",
      phoneNumber: "",
      additionalInfo: "",
      validated: false,
    });
  };

  render() {
    let { validated, loader } = this.state;
    return (
      <Container>
        <Row className="mb-5 mt-5">
          <Col sm={8}>
            <h2>Modify Contact</h2>
          </Col>
          <Col sm={4} className="text-right">
            <Button variant="secondary" onClick={this.props.goBack}>
              Go Back
            </Button>{" "}
            <Button variant="secondary" onClick={this.handleReset}>
              Reset
            </Button>{" "}
          </Col>
        </Row>
        <Row className="mb-5">
          <Col
            sm={8}
            style={{
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            Contact Information
          </Col>
        </Row>
        <Row className="mb-5">
          <Col>
            <Form id="contactForm" noValidate validated={validated} onSubmit={this.handleSubmit}>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    placeholder=""
                    name="contactName"
                    value={this.state.contactName}
                    onChange={this.setContactName}
                  />
                  <Form.Control.Feedback type="invalid">Please type a Name</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>City</Form.Label>
                  <Form.Control placeholder="" name="city" value={this.state.city} onChange={this.setCity} />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder=""
                    name="email"
                    value={this.state.email}
                    onChange={this.setEmail}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Phone Number</Form.Label>
                  <PhoneInput
                    country={"in"}
                    value={this.state.phoneNumber}
                    onChange={(phoneNumber) => this.setPhoneNumber(phoneNumber)}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Group>
                <Form.Label>Additional Information</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="2"
                  name="additionalInfo"
                  value={this.state.additionalInfo}
                  onChange={this.setAdditionalInfo}
                  placeholder="Max 140 Charecters"
                />
              </Form.Group>

              <div className="d-flex mg-b-10">
                <Button
                  variant="primary"
                  type="submit"
                  className="btn btn-sm btn-uppercase btn-primary tx-spacing-1 mr-2"
                  disabled={loader}
                >
                  {loader ? (
                    <>
                      <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> &nbsp;{" "}
                    </>
                  ) : null}
                  Update
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}
