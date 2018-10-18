import React, { Component } from 'react';
import './App.css';
import 'font-awesome/css/font-awesome.min.css';
import { ICONS } from './conf/index';

const MIN_ELEMENTS = 2;
const SELECTED_ITEMS_MAX = 2;
const FLIP_TIMEOUT = 1000;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      level: 0,
      selected: {},
      paired: {},
      iconsSortedRandomly: []
    };

    this.handleCardSelection = this.handleCardSelection.bind(this);
    this.setGameLevel = this.setGameLevel.bind(this);
  }

  componentDidMount() {
    this.setGameLevel();
  }

  componentDidUpdate(_, prevState) {
    if (prevState.level < this.state.level) {
      this.setGameLevel();
    }

    if (Object.keys(this.state.paired).length === this.state.iconsSortedRandomly.length) {
      this.setState({
        level: this.state.level + 1,
        selected: {},
        paired: {}
      });
    }

    if (Object.keys(this.state.selected).length === SELECTED_ITEMS_MAX) {
      const matchingPairs = Object.keys(this.state.selected).reduce((accum, key) => {
        const icon = key.split('_')[0];

        if (!accum[icon]) {
          accum[icon] = icon;
        }

        return accum;
      }, {});

      if (Object.keys(matchingPairs).length > 1) {
        setTimeout(() => {
          this.setState({
            ...this.state,
            selected: {}
          });
        }, FLIP_TIMEOUT);
      } else {
        setTimeout(() => {
          this.setState({
            ...this.state,
            selected: {},
            paired: {
              ...this.state.paired,
              ...this.state.selected
            }
          });
        }, FLIP_TIMEOUT);
      }
    }
  }

  setGameLevel() {
    const max = ICONS.length;
    const qty = MIN_ELEMENTS + this.state.level * 2;
    const qtyPerLevel = qty > max ? max : qty;
    const copy = [...ICONS];

    const iconsSelected = [...Array(qtyPerLevel)].map(() => {
      const index = Math.floor((Math.random() * copy.length));
      const item = copy.splice(index, 1);

      return item[0];
    });

    const iconsToShow = [...iconsSelected, ...iconsSelected];

    const iconsSortedRandomly = [...Array(qtyPerLevel * 2)].map(() => {
      const index = Math.floor((Math.random() * iconsToShow.length));
      const item = iconsToShow.splice(index, 1);

      return item[0];
    });

    this.setState({
      iconsSortedRandomly
    });
  }

  handleCardSelection(id) {
    const { selected } = this.state;

    if (!selected[id] && Object.keys(this.state.selected).length < SELECTED_ITEMS_MAX) {
      this.setState({
        ...this.state,
        selected: {
          ...selected,
          [id]: id
        }
      });
    }
  }

  render() {
    const { level } = this.state;

    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <h1>Find pairs!</h1>
          </div>
          <div className="row">
            <h2 className="points-text">Level: {level + 1}</h2>
          </div>
          <div className="row">
            <div className="grid">
              {this.state.iconsSortedRandomly.map((item, index) => {
                const id = `${item}_${index}`;

                return (
                  <div
                    key={id}
                    className={`flip-card ${this.state.selected[id] || this.state.paired[id] ? 'selected' : '' } ${this.state.paired[id] ? 'paired' : '' }`.trim()}
                    onClick={ !this.state.paired[id] ? this.handleCardSelection.bind(null, id) : null}>
                      <div className="card-body">
                        <div className="card-back">
                          <i className={`fa ${item}`.trim()} />
                        </div>
                        <div className="card-front">
                          {index + 1}
                        </div>
                      </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
