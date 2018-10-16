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
      level: 0
    };
  }
  render() {
    const { level } = this.state;
    const MAX = ICONS.length;
    const qty = MIN_ELEMENTS + level * 2;
    const qtyPerLevel = qty > MAX ? MAX : qty;
    const copy = [...ICONS];

    const iconsToShow = [...Array(qtyPerLevel)].map(() => {
      const index = Math.floor((Math.random() * copy.length));
      const item = copy.splice(index, 1);

      return item[0];
    });

    return (
      <div className="App">
        <div className="container">
          <div className="row">
          {iconsToShow.map((item) => {
            return (
              <div key={`card-${item}`} className="col-sm-1 py-3">
                <div className="card">
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
