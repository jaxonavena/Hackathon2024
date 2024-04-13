import React, { useState, useLocat } from "react";
import { useLocation } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";

export default function Landing() {
    let location = useLocation();
    const { pathname } = location;
    return(
       <Container>
        <h1>Safecation</h1>
       </Container>
    )
}
