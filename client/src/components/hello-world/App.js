import React from 'react';
import Button from './Button'
import { connect } from 'react-redux';

import * as actions from 'actions/indexActions';
import store from 'reduxFiles/store';
import List from './List';

export function App(props) {
  
  return (
    <div>
      <h1>Hola Mundo</h1>
      <Button clickAction={() => store.dispatch(actions.fetchCards())} text={"Get Test Data"}/>
      <List data={props.testData}/>
    </div>
  )
    
}

const mapStateToProps = (state) => ({
  testData: state.testData
});

export default connect(mapStateToProps)(App);
