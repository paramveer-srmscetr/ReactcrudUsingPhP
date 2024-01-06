import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Adduser from '../Component/Adduser';
import Userlist from '../Component/Userlist';
import { Container, Row, Col } from 'react-bootstrap';

const Experience = () => {
  return (
    <section className="mb-5">
      <Container>
        <span className="text-gray">What I have done till now</span>
        <h1>Work Experience</h1>
        <Row>
          <Col md={6} lg={4}>
            <div className="box">
              <div className="vertical">
                <div className="vertical-title">HTML CSS Developer</div>
                <div className="vertical-desc">
                  I have worked with HTML and CSS, and I completed my library
                  project along with various other projects. The library project
                  allowed me to demonstrate my understanding of front-end
                  technologies and my ability to design and implement user
                  interfaces with creativity and attention to detail. I am eager
                  to keep learning and improving my skills, as web development is
                  a dynamic field with endless opportunities.
                </div>
              </div>
            </div>
          </Col>
          <Col md={6} lg={4}>
          <div class="vertical-title1">Javascript Developer</div>
            <div class="vertical-desc1">
              I have also worked extensively with JavaScript, which has been an
              integral part of my web development journey. Through my projects,
              I have honed my skills in creating interactive and dynamic
              elements on websites, enhancing user experiences and functionality
              As I continue to delve deeper into JavaScript, I look forward to
              contributing my expertise to even more challenging and rewarding
              projects.
            </div>
          </Col>
          <Col md={6} lg={4}>
          <div class="vertical-title2">React js Developer</div>
            <div class="vertical-desc2">
              I have integrated React with various back-end technologies,
              creating full-stack applications that seamlessly communicate with
              servers and databases. Working with React has expanded my
              understanding of front-end development and enabled me to craft
              visually appealing and responsive user interfaces.I continue to
              explore new React features and best practices, staying up-to-date
              with the evolving React ecosystem
            </div>
          </Col>
          <Col md={6} lg={4}>
          <div className='mt-5 p-2' >Node js Developer</div>
            <div class="vertical-desc3">
              Node.js has been a game-changer in my web development journey,
              enabling me to build fast and scalable applications on the
              server-side. I have developed robust back-end systems, handling
              data, authentication, and server logic efficiently. The
              non-blocking, event-driven architecture of Node.js has allowed me
              to create efficient applications.The Node.js community is
              incredibly active and continuously improve my skills.
            </div>
          </Col>
          <Col md={6} lg={4}>
          <div className='mt-5 p-2'>C++ Developer</div>
            <div class="vertical-desc4">
              I have successfully implemented various data structures using C++.
              The world of data structures has been an exciting playground for
              me, where I've honed my skills in designing efficient algorithms
              and organizing data effectively.I continue my exploration of data
              structures and C++ development, I look forward to taking on more
              challenging projects and contributing my expertise to innovative
              software solutions
            </div>
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
    </section>
  );
};

export default Experience;
