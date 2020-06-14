import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Spinner,
  InputGroup,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

toast.configure({
  autoClose: 3000,
  draggable: false,
});

export default class AddContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contactName: "",
      city: "",
      email: "",
      phoneNumber: "",
      additionalInfo: "",
      validated: false,
      loader: false,
      phoneNumVal: false,
    };
  }

  handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    this.setValidated(true);
    let isValid = this.validateEmail();
    if (isValid) {
      this.addContact();
    } else {
      toast.error("Somefields are invalid!!!. Correct and try again");
    }
  };

  // checkOtherFieldsValidation = () => {
  //   let { contactName, email, phoneNumber, city } = this.state;
  //   if (
  //     contactName &&
  //     contactName.length <= 40 &&
  //     email &&
  //     this.validateEmail() &&
  //     phoneNumber &&
  //     phoneNumber.length === 10 &&
  //     this.validatePhoneNumber() &&
  //     city
  //   ) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };

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

  addContact = (isSaveAndNew) => {
    let { contactName, email, phoneNumber, city, additionalInfo } = this.state;
    this.setState({
      loader: true,
    });
    fetch("/api/addContact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
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
            title: "An error occured while adding Contact",
            showConfirmButton: true,
            timer: 1500,
          });
        } else {
          console.log("contact added successfully");
          Swal.fire({
            icon: "success",
            title: "Contact added successfully",
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
        if (isSaveAndNew) {
          this.handleReset();
        }
        this.setState({
          loader: false,
        });
        this.setValidated(false);
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
      loader: false,
    });
  };

  handleSaveAndNew = () => {
    this.setValidated(true);
    this.addContact(true);
  };

  render() {
    let { validated, loader, phoneNumVal } = this.state;
    return (
      <Container>
        <Row className="mb-5 mt-5">
          <Col sm={8}>
            <h2>Create Contact</h2>
          </Col>
          <Col sm={4} className="text-right">
            <Button
              variant="secondary"
              onClick={() => this.props.history.push("/contact")}
            >
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
            <Form
              id="contactForm"
              noValidate
              validated={validated}
              onSubmit={this.handleSubmit}
            >
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Name </Form.Label>
                  <Form.Control
                    placeholder="Name"
                    name="contactName"
                    value={this.state.contactName}
                    onChange={this.setContactName}
                    // required
                    maxLength={40}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Please enter valid name
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Location </Form.Label>
                  <Form.Control
                    placeholder="City, Place"
                    name="city"
                    value={this.state.city}
                    onChange={this.setCity}
                    // required
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Please enter valid city name
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Email </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter the email id"
                    name="email"
                    value={this.state.email}
                    onChange={this.setEmail}
                    // required
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Please enter valid email
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Group>
                    <Form.Label>Phone Number</Form.Label>
                    <PhoneInput
                      country={"in"}
                      value={this.state.phoneNumber}
                      onChange={(phoneNumber) =>
                        this.setPhoneNumber(phoneNumber)
                      }
                    />
                  </Form.Group>

                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    Please enter valid phoneNumber
                  </Form.Control.Feedback>
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
                  maxLength={140}
                  placeholder="Max 140 Charecters"
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <div className="d-flex mg-b-10">
                <Button
                  variant="primary"
                  className="btn btn-sm btn-uppercase btn-primary tx-spacing-1 mr-2"
                  disabled={loader}
                  onClick={this.handleSaveAndNew}
                >
                  {loader ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />{" "}
                      &nbsp;{" "}
                    </>
                  ) : null}
                  Save 
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}
