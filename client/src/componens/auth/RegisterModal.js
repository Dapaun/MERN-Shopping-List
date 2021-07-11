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
import { register } from '../../actions/authActions';
import { clearErros } from '../../actions/errorActions';

const RegisterModal = (props) => {
    const [modal, setModal] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState(null);
    const {error, isAuthenticated} = props;

  React.useEffect(() => {
      console.log('It gets in his effect');
    if(error.id === 'REGISTER_FAIL') {
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
  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
        name, email, password
    }
    props.register(newUser);
    // toggle();
  };

  return (
    <div>
      <NavLink onClick={toggle} href="#"> Register </NavLink>
      <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>Add 
        </ModalHeader>
        <ModalBody>
            {msg ? <Alert color="danger">{msg}</Alert> : null}
            <Form onSubmit={onSubmit}>
                <FormGroup>
                    <Label for="item">Name</Label>
                    <Input 
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Name"
                        onChange={onChangeName}
                        className="mb-3"
                    />

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
                        Register
                    </Button>
                </FormGroup>
            </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}


RegisterModal.propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErros: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(mapStateToProps, { register, clearErros })(RegisterModal);