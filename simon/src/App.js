import React, { Component } from "react";
import "./App.css";
import { wait } from "@testing-library/dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      level: 0,
      computerReady: true,
      playerReady: false,
      pattern: [],
      guess: [],
      count: 0
    };

    this.startRound = this.startRound.bind(this);
    this.playerTurn = this.playerTurn.bind(this);
  }

  startRound = event => {
    event.preventDefault();

    if (!this.state.computerReady && this.state.playerReady) {
      return;
    }
    this.setState({ computerReady: false, level: this.state.level + 1 });
    document.getElementById(9).innerHTML = "Here is the next button";
    this.state.pattern.push(Math.floor(Math.random() * 9));

    this.state.pattern.forEach(function(id) {
      var element = document.getElementById(id);
      element.focus();
      wait(1000);
      document.getElementById("header");
      wait(1000);
    });

    setTimeout(() => {
      var element = document.getElementById(9);
      element.innerHTML = "your turn!";
      element.focus();
      this.setState({
        playerReady: true
      });
    }, (this.state.level + 1) * 1000);
  };

  playerTurn = event => {
    event.preventDefault();

    if (!this.state.playerReady && this.state.computerReady) {
      return;
    }
    var count = this.state.count;
    count++;
    this.setState({ count: count });
    this.state.guess.push(event.target.id);
    if (count === this.state.level) {
      var win = this.checkWin();
      if (win) {
        this.setState({
          guess: [],
          count: 0,
          playerReady: false,
          computerReady: true
        });
      } else {
        this.setState({
          guess: [],
          count: 0,
          pattern: [],
          level: 0,
          playerReady: false,
          computerReady: true
        });
      }
    } else {
      return;
    }

    var element = document.getElementById(9);
    element.innerHTML = "click to start my turn";
    element.focus();
    this.setState({
      playerReady: true
    });
  };

  checkWin() {
    var win = true;
    var i = 0;
    while (i < this.state.pattern.length) {
      if (this.state.pattern[i] != this.state.guess[i]) {
        win = false;
      }
      i++;
    }
    return win;
  }

  render() {
    return (
      <div className="App">
        <h1 id="header">Simon Says</h1>
        <h2>Remember the pattern</h2>
        <p>level: {this.state.level}</p>
        <div className="buttonSpace">
          <div>
            <button
              class="button red"
              id="0"
              onClick={event => this.playerTurn(event)}
            />
            <button
              class="button orange"
              id="1"
              onClick={event => this.playerTurn(event)}
            />
            <button
              class="button yellow"
              id="2"
              onClick={event => this.playerTurn(event)}
            />
          </div>
          <div>
            <button
              class="button green"
              id="3"
              onClick={event => this.playerTurn(event)}
            />
            <button
              class="button blue"
              id="4"
              onClick={event => this.playerTurn(event)}
            />
            <button
              class="button indigo"
              id="5"
              onClick={event => this.playerTurn(event)}
            />
          </div>
          <div>
            <button
              class="button violet"
              id="6"
              onClick={event => this.playerTurn(event)}
            />
            <button
              class="button white"
              id="7"
              onClick={event => this.playerTurn(event)}
            />
            <button
              class="button black"
              id="8"
              onClick={event => this.playerTurn(event)}
            />
          </div>
          <div>
            <button
              class="button white2"
              onClick={event => this.startRound(event)}
              id="9"
            >
              click to start my turn
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
