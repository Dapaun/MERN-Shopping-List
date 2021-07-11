import React, { useState } from 'react';
import { 
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Container
} from 'reactstrap';
import RegisterModal from './auth/RegisterModal';
import LoginModal from './auth/LoginModal';
import Logout from './auth/Logout';
import { connect, connet } from 'react-redux';
import PropTypes from 'prop-types';

const AppNavbar = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const { isAuthenticated, user} = props.auth;

    const authLinks = (
        <>
            <NavItem>
                <span className='navbar-text'>
                    <strong>
                        {user ? user.name : ''}
                    </strong>
                </span>
            </NavItem>
            <NavItem>
                <Logout />
            </NavItem>
        </>
    );
    const guestLinks = (
        <>
           <NavItem>
                <RegisterModal />
            </NavItem>

            <NavItem>
                <LoginModal />
            </NavItem>
    </>
    )
    return (
        <div>
            <Navbar color="dark" dark expand="sm" className="mb-5">
                <Container>  
                <NavbarBrand href="/">Shopping List</NavbarBrand>
                <NavbarToggler onClick={() => toggle()}></NavbarToggler> 
                <Collapse isOpen={isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            {isAuthenticated ? authLinks : guestLinks}
                        </Nav>
                </Collapse>
                </Container>

            </Navbar>
        </div>
    );
};

AppNavbar.propTypes = {
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(mapStateToProps, null)(AppNavbar);