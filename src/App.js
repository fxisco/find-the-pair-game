import React, { Component } from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { ICONS } from './conf/index';

const MIN_ELEMENTS = 10;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      level: 0,
      selected: []
    };

    const MAX = ICONS.length;
    const qty = MIN_ELEMENTS + this.state.level * 2;
    const qtyPerLevel = qty > MAX ? MAX : qty;
    const copy = [...ICONS];

    const iconsSelected = [...Array(qtyPerLevel)].map(() => {
      const index = Math.floor((Math.random() * copy.length));
      const item = copy.splice(index, 1);

      return item[0];
    });

    const iconsToShow = [...iconsSelected, ...iconsSelected];

    this.state.iconsSortedRandomly = [...Array(qtyPerLevel * 2)].map(() => {
      const index = Math.floor((Math.random() * iconsToShow.length));
      const item = iconsToShow.splice(index, 1);

      return item[0];
    });

    this.handleCardSelection = this.handleCardSelection.bind(this);
  }

  handleCardSelection(id) {
    const { selected } = this.state;

    if (selected.includes(id)) {
      const index = selected.findIndex((item) => item === id);

      this.setState({
        ...this.state,
        selected: [
          ...selected.slice(0, index),
          ...selected.slice(index + 1),
        ]
      });
    } else {
      this.setState({
        ...this.state,
        selected: [
          ...selected,
          id
        ]
      });
    }
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="row">
          {this.state.iconsSortedRandomly.map((item, index) => {
            const id = `card-${item}-${index}`;
            return (
              <div key={id} className="col-sm-1 py-3" onClick={this.handleCardSelection.bind(null, `card-${item}-${index}`)}>
                <div className={`card ${this.state.selected.includes(id) ? 'selected' : '' }`}>
                  <div className="card-body">
                    <i className={`fa ${item}`} />
                  </div>
                </div>
              </div>
            );
          })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
