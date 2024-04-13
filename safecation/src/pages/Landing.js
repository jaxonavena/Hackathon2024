import React from "react";
import { useLocation } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";

// Define TextInput component
const TextInput = () => {
  return (
    <div>
      <label htmlFor="textInput">Enter Address:</label>
      <input type="text" id="textInput" />
    </div>
  );
}

// Landing component
export default function Landing() {
    // Access current location
    let location = useLocation();
    const { pathname } = location;

    return (
      <Container>
        <h1>Safecation</h1>
        <div>
          {/* Render TextInput component */}
          <TextInput />
        </div>
      </Container>
    );
}
