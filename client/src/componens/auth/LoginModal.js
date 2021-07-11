import React, { useState } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/authActions';
import { clearErros } from '../../actions/errorActions';

const LoginModal = (props) => {
    const [modal, setModal] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState(null);
    const {error, isAuthenticated} = props;

  React.useEffect(() => {
    if(error.id === 'LOGIN_FAIL') {
        setMsg(error.msg.msg);
    } else {
        setMsg(null);
    }
  }, [error]);

  React.useEffect(() => {
    if(modal) {
        if(isAuthenticated) {
            toggle();
        }
    }
  }, [isAuthenticated, modal])

  console.log('MSG here ', msg);
  const toggle = () => {
      props.clearErros();
      setModal(!modal);
  }

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const user = {
        email,
        password
    };
    props.login(user);
};

  return (
    <div>
      <NavLink onClick={toggle} href="#"> Login </NavLink>
      <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>Add 
        </ModalHeader>
        <ModalBody>
            {msg ? <Alert color="danger">{msg}</Alert> : null}
            <Form onSubmit={onSubmit}>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input 
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        onChange={onChangeEmail}
                        className="mb-3"
                    />

                    <Label for="password">Password</Label>
                    <Input 
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        onChange={onChangePassword}
                        className="mb-3"
                    />
                    <Button
                        color="dark" style={{marginTop: '2rem'}} block>
                        Login
                    </Button>
                </FormGroup>
            </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}


LoginModal.propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErros: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(mapStateToProps, { login, clearErros })(LoginModal);