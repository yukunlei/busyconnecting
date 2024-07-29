import {Navbar, Container} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

export const NavBar = () => {
    const [activeLink, setActiveLink] = useState('home');
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            if (window.scrollY > 50){
                setScrolled(true);
            }else {
                setScrolled(false);
            }
        }
        window.addEventListener("scroll", onScroll);

        return() => window.removeEventListener("scroll", onScroll);
    }, [])

    const onUpdateActiveLink = (value) => {
        setActiveLink(value);
    }
    return (
        <Navbar expand="lg" className={scrolled? "scrolled" : ""}>
            <Container>
                <Navbar.Brand href="#home">BUSY CONNECTING</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#about" className={activeLink === 'about'? 'active navbar-link' : 'navbar-link'} onClick={()=> onUpdateActiveLink('about')}>About Us</Nav.Link>
                        <Nav.Link href="#blogs" className={activeLink === 'blogs'? 'active navbar-link' : 'navbar-link'} onClick={()=> onUpdateActiveLink('blogs')}>Blogs</Nav.Link>
                        <NavDropdown title="Services" id="basic-nav-dropdown" >
                            <NavDropdown.Item href="#action/3.1" className={activeLink === 'grants'? 'active navbar-link' : 'navbar-link'} onClick={()=> onUpdateActiveLink('grants')}>Grants</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2" className={activeLink === 'tenders'? 'active navbar-link' : 'navbar-link'} onClick={()=> onUpdateActiveLink('tenders')}>
                                Tenders
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3" className={activeLink === 'sdm'? 'active navbar-link' : 'navbar-link'} onClick={()=> onUpdateActiveLink('sdm')}>Strategic Digital Marketing</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4" className={activeLink === 'availableG'? 'active navbar-link' : 'navbar-link'} onClick={()=> onUpdateActiveLink('availableG')}>
                                Available Grants
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <span className="navbar-RightSide">
                        <button className="contactBtn" onClick={() => console.log('contact')}>Contact Us</button>
                    </span>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}