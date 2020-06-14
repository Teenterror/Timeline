import React, { Component } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPen } from "@fortawesome/free-solid-svg-icons";
import ModifyContact from "./ModifyContact";
import Select from "react-select";

export default class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contactList: [],
      showEditContactPage: false,
      contactObj: {},
      cityList: [],
      filtercontactList: [],
    };
  }

  componentDidMount() {
    this.fetchContacts();
  }

  fetchContacts = () => {
    fetch("/api/getContacts")
      .then((res) => res.json())
      .then((contactList) => {
        if (!contactList) {
          console.error("An error occured while fetching details");
        } else {
          this.getCityList(contactList);
          this.setState({
            contactList,
          });
          let clist = contactList.map(({ city }) => city);
          console.log("clist", clist);
        }
      })
      .catch((error) => {
        console.error("Error while contact details", error);
      });
  };

  getCityList = (list) => {
    let tempList = [];
    let cityList = [];
    for (let i = 0; i < list.length; i++) {
      if (list[i].city) {
        if (tempList.length === 0) {
          cityList.push({
            value: list[i].city,
            label: this.getFirstLetterCapital(list[i].city),
          });
          tempList.push(list[i].city);
        } else {
          if (!tempList.includes(list[i].city)) {
            cityList.push({
              value: list[i].city,
              label: this.getFirstLetterCapital(list[i].city),
            });
            tempList.push(list[i].city);
          }
        }
      }
    }
    this.setState({
      cityList,
    });
  };

  getFirstLetterCapital = (string) => {
    return string.substring(0, 1).toUpperCase() + string.substring(1);
  };

  editContact = (contactObj) => {
    this.setState({
      contactObj,
      showEditContactPage: true,
    });
  };

  editContact = (contactObj) => {
    this.setState({
      contactObj,
      showEditContactPage: true,
    });
  };

  hideModifyPage = () => {
    this.setState({
      contactObj: {},
      showEditContactPage: false,
    });
  };

  handleMultiSelect = (selectedOption) => {
    let { contactList, filtercontactList } = this.state;
    let optionValue = [];
    for (let i = 0; i < selectedOption.length; i++) {
      optionValue.push(selectedOption[i].value);
    }
    filtercontactList = contactList.filter(function (contact) {
      return optionValue.indexOf(contact.city) !== -1;
    });
    this.setState({ filtercontactList });
  };

  render() {
    let {
      contactList,
      showEditContactPage,
      contactObj,
      cityList,
      filtercontactList,
    } = this.state;

    if (filtercontactList.length > 0) {
      contactList = filtercontactList;
    }

    return (
      <>
        {!showEditContactPage ? (
          <>
            <Row className="mt-5 mb-5 mr-1 ml-1">
              <Col sm={8}>
                <h2>Contact</h2>
              </Col>
              <Col sm={4} className="text-right">
                <Button
                  variant="primary"
                  onClick={() => this.props.history.push("/addContact")}
                >
                  <FontAwesomeIcon icon={faPlus} />
                  &nbsp;Add
                </Button>{" "}
              </Col>
            </Row>
            <Row>
              <Col className="m-3">
                <Select
                  isMulti
                  name="city"
                  options={cityList}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={this.handleMultiSelect}
                />
              </Col>
            </Row>
          </>
        ) : null}

        {/* <Row>
          <Col className="m-3">
            <Select
              isMulti
              name="colors"
              options={cityList}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={this.handleMultiSelect}
            />
          </Col>
        </Row> */}

        {!showEditContactPage ? (
          contactList.map((contactObj, key) => {
            return (
              <div
                key={key}
                style={{
                  padding: 25,
                  borderRadius: 5,
                  boxShadow:
                    "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
                  backgroundColor: "#ffffff",
                  margin: 15,
                }}
              >
                <Row>
                  <Col xs={9}>
                    <Row>
                      <Col>
                        <Row
                          style={{
                            display: "flex",
                            justifyContent: "flex-start",
                          }}
                        >
                          <span
                            style={{
                              fontWeight: "bold",
                              fontSize: 18,
                            }}
                          >
                            {contactObj.name}
                          </span>
                        </Row>
                        <Row
                          style={{
                            display: "flex",
                            justifyContent: "flex-start",
                          }}
                        >
                          <span
                            style={{
                              fontSize: 16,
                            }}
                          >
                            Call: {contactObj.phoneNumber}
                          </span>
                        </Row>
                      </Col>
                      <Col>
                        <Row
                          style={{
                            display: "flex",
                            justifyContent: "flex-start",
                          }}
                        >
                          <span
                            style={{
                              fontSize: 16,
                            }}
                          >
                            Brand:{contactObj.brandName}
                          </span>
                        </Row>

                        <Row
                          style={{
                            display: "flex",
                            justifyContent: "flex-start",
                          }}
                        >
                          Address: {contactObj.city}
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                  <Col
                    xs={3}
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    {" "}
                    <Button
                      variant="outline-primary"
                      onClick={() => this.editContact(contactObj)}
                    >
                      <FontAwesomeIcon
                        icon={faPen}
                        // onClick={this.addNewEmployee}
                      />
                      &nbsp; Edit
                    </Button>
                  </Col>
                </Row>
              </div>
            );
          })
        ) : (
          <ModifyContact
            contactObj={contactObj}
            goBack={this.hideModifyPage}
            updatedContacts={this.fetchContacts}
          />
        )}
      </>
    );
  }
}
