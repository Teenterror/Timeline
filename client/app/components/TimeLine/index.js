import React, { Component } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import DatePicker from "react-datepicker";
import ViewTimeLine from "./ViewTimeLine";
import { toast } from "react-toastify";

toast.configure({
  autoClose: 3000,
  draggable: false,
});

export default class TimeLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeLineList: [],
      filterTimelineList: [],
      showEventContainer: false,
      year: 2000,
      eventName: "",
      eventDate: new Date(),
    };
  }

  componentDidMount() {
    this.fetchTimeLine();
  }

  fetchTimeLine = () => {
    fetch("/api/getTimeLine")
      .then((res) => res.json())
      .then((timeLineList) => {
        if (!timeLineList) {
          toast.error("An error occured while fetching details");
        } else {
          this.setState({
            timeLineList,
          });
        }
      })
      .catch((error) => {
        console.error("Error while contact details", error);
      });
  };

  handleMultiSelect = (selectedOption) => {
    let { timeLineList, filtertimeLineList } = this.state;
    let optionValue = [];
    for (let i = 0; i < selectedOption.length; i++) {
      optionValue.push(selectedOption[i].value);
    }
    filtertimeLineList = timeLineList.filter(function (contact) {
      return optionValue.indexOf(contact.city) !== -1;
    });
    this.setState({ filtertimeLineList });
  };

  toggleAddEventContainer = () => {
    this.setState((prevState, prevProps) => {
      return {
        showEventContainer: !prevState.showEventContainer,
      };
    });
  };

  setEventName = (e) => {
    this.setState({
      eventName: e.target.value,
    });
  };

  setEventYear = (e) => {
    this.setState({
      year: e.target.value,
    });
  };

  saveEvent = () => {
    const { eventName, year, eventDate } = this.state;
    fetch("/api/addTimelineEvent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        year,
        events: {
          eventName,
          eventDate: eventDate.getDate() !== new Date().getDate() ? eventDate : null,
        },
      }),
    })
      .then((res) => res.json())
      .then((timeLineList) => {
        if (!timeLineList) {
          toast.error("An error occured while fetching details");
        } else {
          toast.success("Saved");
          this.fetchTimeLine();
        }
      })
      .catch((error) => {
        console.error("Error while contact details", error);
      })
      .finally(() => {
        this.toggleAddEventContainer();
      });
  };

  handleDateOfEvent = (eventDate) => {
    this.setState({
      eventDate,
    });
  };

  render() {
    let { timeLineList, showEventContainer, eventName, year, eventDate } = this.state;
    console.log("this.state", timeLineList);

    return (
      <>
        <Container>
          <Row className="mt-5 mb-5 mr-1 ml-1 text-center">
            <Col>
              <h2>TimeLine</h2>
            </Col>
          </Row>
          <Row>
            <Col className="m-3">
              <Select
                isMulti
                name="city"
                options={[]}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={this.handleMultiSelect}
              />
            </Col>
          </Row>
          {timeLineList.length > 0 ? (
            <Row>
              <Col style={styles.mainContent}>
                <ViewTimeLine timeLineList={timeLineList} />
              </Col>
            </Row>
          ) : null}
        </Container>

        <div style={{ display: showEventContainer ? null : "none" }}>
          <Form style={styles.addEventFormContainer}>
            <Row>
              <Form.Group as={Col}>
                <Form.Label>Year</Form.Label>
                <Form.Control type="text" value={year} onChange={this.setEventYear} />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Day & Month</Form.Label>
                <div className="customDatePickerWidth">
                  <DatePicker
                    className="form-control"
                    showMonthDropdown
                    onChange={this.handleDateOfEvent}
                    dateFormat="dd/MM"
                    popperPlacement="top-end"
                    showDayMonthPicker
                    selected={eventDate}
                  />
                </div>
              </Form.Group>
            </Row>

            <Form.Group>
              <Form.Label>Event</Form.Label>
              <Form.Control
                type="text"
                placeholder="Eg: Sharmila born"
                value={eventName}
                onChange={this.setEventName}
              />
            </Form.Group>

            <Button variant="primary" onClick={this.saveEvent}>
              Save
            </Button>
          </Form>
        </div>

        <div style={styles.addTimeLinediv}>
          <Button variant="primary" style={styles.addButton} onClick={this.toggleAddEventContainer}>
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </div>
      </>
    );
  }
}

const styles = {
  addTimeLinediv: {
    right: "30px",
    bottom: "30px",
    position: "absolute",
  },
  addButton: {
    borderRadius: "50px",
  },
  mainContent: {
    height: "700px",
  },
  addEventFormContainer: {
    width: "250px",
    height: "250px",
    right: "30px",
    bottom: "0px",
    position: "absolute",
  },
};
