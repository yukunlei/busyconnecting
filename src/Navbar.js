import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Dropdown, Button, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import './Navbar.css';

const menu = (
    <Menu>
        <Menu.Item key="0">
            <Link to="/services/grants">Grants</Link>
        </Menu.Item>
        <Menu.Item key="1">
            <Link to="/services/tenders">Tenders</Link>
        </Menu.Item>
        <Menu.Item key="2">
            <Link to="/services/strategic-digital-marketing">Strategic Digital Marketing</Link>
        </Menu.Item>
        <Menu.Item key="3">
            <Link to="/services/available-grants">Available Grants</Link>
        </Menu.Item>
    </Menu>
);

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-brand">BUSYCONNECTING</div>
                <ul>
                    <li><Link to="/about-us" className="nav-link">About Us</Link></li>
                    <li>
                        <Dropdown overlay={menu} trigger={['click']}>
                            <a href="/services" className="nav-link" onClick={e => e.preventDefault()}>
                                <Space>
                                    Services
                                    <DownOutlined />
                                </Space>
                            </a>
                        </Dropdown>
                    </li>
                    <li><Link to="/blogs" className="nav-link">Blogs</Link></li>
                    <li>
                        <Button type="primary">
                            <Link to="/contact-us">Contact Us</Link>
                        </Button>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
