import React, { Component } from "react";
import classes from "./App.css";
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/withClass';
import Aux from '../hoc/Auxiliary';
// import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

class App extends Component {
  
  // LifeCycle - creation : 1. constructor
  constructor(props) {
    super(props);
    console.log('[App.js] constructor');
    // you can set state in constructor. (old way)
  };

  state = {
    persons: [
      { id: "asfa1", name: "Max", age: 28 },
      { id: "vasdf1", name: "Manu", age: 29 },
      { id: "asdf11", name: "Stephanie", age: 26 }
    ],
    otherState: "some other value!",
    showPersons: false,
    showCockpit: true,
    changeCounter: 0
  };

  // LifeCycle - creation : 2. getDerivedStateFromProps
  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps', props);

    return state;
  };

  // LifeCycle - creation : 4. componentDidMount
  // 3 most import lifecycle hooks (componentDidMount, shouldComponentUpdate, componentDidUpdate)
  componentDidMount() {
    console.log('[App.js] componentDidMount');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('[App.js] shouldComponentUpdate');

    return true;
  }

  componentDidUpdate() {
    console.log('[App.js] componentDidUpdate');
  };

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    // const person = Object.assign({}, this.state.persons[personIndex]);

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState((prevState, props) => {
      return {
        persons: persons, 
        changeCounter: prevState.changeCounter + 1 
      }; 
    });
  };

  deletePersonHandler = personIndex => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  };

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  };

  // LifeCycle - creation : 3. render
  render() {
    console.log('[App.js] render');

    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <Persons 
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler}
        />
      );
    }

    return (
      <Aux>
        <button onClick={() => { this.setState({ showCockpit: false }); }}>Remove Cockpit</button>
        {this.state.showCockpit ? <Cockpit 
          title={this.props.appTitle}
          showPersons={this.state.showPersons} 
          personsLength={this.state.persons.length} 
          clicked={this.togglePersonsHandler}
        /> : null }
        {persons}
      </Aux>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default withClass(App, classes.App);
