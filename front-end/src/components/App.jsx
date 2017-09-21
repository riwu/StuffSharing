import React from 'react';

class App extends React.Component {
  state = {
    ids: [],
  }
  componentDidMount() {
    fetch('http://localhost:3000/').then(result => result.json()).then(data =>
    this.setState({ ids: data.map(obj => obj.id) }));
  }
  render() {
    return (
      <div>
        <h1>This is a stuff sharing website for CS2102</h1>
        <h3>{`id count: ${this.state.ids.length}`}</h3>
        {
          this.state.ids.map(id => (
            <div key={id}>
              {id}
            </div>
          ))
        }
      </div>
    );
  }
}
export default App;
