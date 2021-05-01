import React from 'react';
import {Container, Row, Col, Card} from 'react-bootstrap';

const FormContainer = ({children}) => {
    return (
        <Container>
           {/* <Card style={{boxShadow:'2px 3px 3px grey'}}> */}
           <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    {children}
                </Col>
            </Row>
           {/* </Card> */}
        </Container>
    )
}

export default FormContainer;
