import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from './componens/AppNavbar';
import ShoppingList from './componens/ShoppingList';
import { Provider } from 'react-redux';
import store from './store';
import { Container } from 'reactstrap';
import ItemModal from './componens/ItemModal';
import { loadUser} from './actions/authActions';
import React from 'react';
import { Component } from 'react';

function App() {
  React.useEffect(() => {
    console.log('In the USe effect');
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store = {store}>
      <div className="App">
        <AppNavbar/>
        <Container>
          <ItemModal/>  
          <ShoppingList/>
        </Container>  
      </div>
    </Provider>
  );
};

export default App;
