import React, { useState } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';

const ItemModal = (props) => {
    const [modal, setModal] = useState(false);
    const [name, setName] = useState('');

  const toggle = () => setModal(!modal);

  const onChange = (e) => {
    setName(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const newItem = {
        name: name
    };
    props.addItem(newItem);
    toggle();
  };

  return (
    <div>
      <Button color="dark"
        onClick={toggle}
        style={{marginBottom: '2rem'}}>
            Add item
      </Button>
      <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>Add 
        </ModalHeader>
        <ModalBody>
            <Form onSubmit={onSubmit}>
                <FormGroup>
                    <Label for="item">Item</Label>
                    <Input 
                        type="text"
                        name="name"
                        id="item"
                        placeholder="Add shopping item"
                        onChange={onChange}
                    />
                    <Button
                        color="dark" style={{marginTop: '2rem'}} block>
                        Add Item
                    </Button>
                </FormGroup>
            </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}

const mapStateToProps = state => ({
    item: state.item
});

export default connect(mapStateToProps, {addItem})(ItemModal);