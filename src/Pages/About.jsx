import React from 'react';
import Adduser from '../Component/Adduser';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Userlist from '../Component/Userlist';

const About = () => {
  return (
    <>
       
    
       <Container className="intro mt-5">
        <Row>
          <Col md={6} className="first-box">
            <h1 className="mb-3">Introduction</h1>
            <p>
              I am Paramveer Singh pursuing a Bachelor of Technology (B.Tech) degree
              in the Computer Science branch. I am currently enrolled at Shri Ram
              Murti Smarak College of Engineering Technology and Research located in
              Bareilly. My professional focus lies in web development, which means I
              specialize in designing, building, and maintaining websites and web
              applications. I possess skills in various programming languages, such as
              HTML, CSS, JavaScript,php,mysql and possibly more advanced technologies like React,
              Angular, or Vue.js, depending on my academic curriculum and personal
              interests.
            </p>
          </Col>
          <Col md={6} className="second-box">
            <h1 className="mb-3">Achievements</h1>
            <ul>
              <li>I got gfg swag kit in job-a-thon contest rank under 150.</li>
              <li>I have the 2** at codechef and on leetcode 350+ solving.</li>
              <li>I got 2nd prize at game of code on AKTU Zonal of technical.</li>
              <li>I got runner up prize in kabaddi on AKTU Zonal of games.</li>
              <li>I got 30k scholarship for 80% in B.tech first year from SRMS-Trust.</li>
            </ul>
          </Col>
        </Row>
      </Container>

      <footer className="bg-dark text-light mt-3 mb-3 py-5">
      <div className="d-flex justify-content-center">
        <Adduser />
      </div>
      <div className="d-flex justify-content-center">
        <Userlist />
      </div>
    </footer>
    </>
  );
};

export default About;
