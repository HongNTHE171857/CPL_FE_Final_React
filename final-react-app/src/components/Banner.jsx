import React from 'react';
import { Container } from 'react-bootstrap';

const Banner = () => {
    return (
        <div className='banner' style={{display: "inherit"}}>
            <Container>
                <h1 className='logo-font'>conduit</h1>
                <p>A place to share your knowledge</p>
            </Container>
        </div>
    );
};

export default Banner;