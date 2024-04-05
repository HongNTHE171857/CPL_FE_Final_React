import React from 'react';
import { Container } from 'react-bootstrap';
import style from "../styles/Banner.module.css";

const Banner = () => {
    return (
        <div className={style.banner} style={{display: "inherit"}}>
            <Container>
                <h1 className={style['logo-font']}>conduit</h1>
                <p>A place to share your knowledge</p>
            </Container>
        </div>
    );
};

export default Banner;