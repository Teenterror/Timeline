import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import React, { Component } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

export default class ViewTimeLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeLineList: [],
    };
  }

  componentDidMount() {
    let { timeLineList } = this.props;
    if (timeLineList.length > 0) {
      this.setState({
        timeLineList,
      });
    }
  }

  render() {
    let { timeLineList } = this.state;
    return (
      <PerfectScrollbar>
        <VerticalTimeline>
          {timeLineList.map((timeLine, key) => {
            return (
              <VerticalTimelineElement
                key={key}
                contentStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
                contentArrowStyle={{ borderRight: "7px solid  rgb(33, 150, 243)" }}
                date={timeLine.year}
                iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
                //   icon={<WorkIcon />}
              >
                <ul>
                  {timeLine.events.map((event, key) => {
                    return (
                      <li key={key}>
                        <p>
                          <span>{subStringDay(event.eventDate)}</span>
                          {event.eventName}
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </VerticalTimelineElement>
            );
          })}
        </VerticalTimeline>
      </PerfectScrollbar>
    );
  }
}

function subStringDay(date) {
  if (date === null) return null;
  let incomingDate = new Date(date);
  return incomingDate.getDate() + " - " + incomingDate.getMonth() + "   ";
}
