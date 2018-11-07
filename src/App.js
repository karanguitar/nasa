import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import REACT_APP_NASA_API_KEY from './keys'

class App extends Component {

  constructor(){
    super()
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }
  
  state={
    explanation: "",
    imageUrl: "",
    title: "",
    date: "2002-12-17"
  }

  



  componentDidMount(){

    
    this.makeRequest(this.state.date)

    
  }

  makeRequest = (date) =>{
    const key = REACT_APP_NASA_API_KEY
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${key}&date=${date}`)
    .then((info) =>{
      info.json()
      .then((data) =>{
        this.setState({
          title: data.title,
          explanation: data.explanation,
          imageUrl: data.url
        })
        
      })
      
    })
  }

  handleChange = (event) => {
    this.setState({
      date : event.target.value
    })
    
    console.log(this.state.date)
    
  
  }

  handleSubmit = (event) =>{
    event.preventDefault()
    this.makeRequest(this.state.date)
    console.log(this.state.date)

  }

  render() {
    console.log(process.env.REACT_APP_NASA_API_KEY)
    return (
      
      <div className="App container">
          <h1 className="logo">Space Explorer</h1>
          <h4 className="logo">Enter a date to explore the universe.</h4>
          <form onSubmit={this.handleSubmit}>
          <div className="wrapper">
            <input type="date" min="2000-01-01" max="2018-08-31" id="date" className="date" onChange={this.handleChange}/>
            <button className="btn">Launch!</button>
          </div>
          
          <div className="wrapper">
            <img src={this.state.imageUrl} alt=""/>
            <div>
              <h1>{this.state.title}</h1>
              <p>{this.state.explanation}</p>
            </div>
          </div>
          
          
          </form>
      </div>
    );
  }
}

export default App;
