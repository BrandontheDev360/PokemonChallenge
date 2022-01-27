import React, { Component } from 'react'
import './PokeFetch.css';


class PokeFetch extends Component {
  constructor() {
    super()
    this.state = {
      pokeInfo: '',
      pokeSprite: '',
      pokeName: '',
      time: 10, 
    }
  }

  countDown = () => {
    this.myInterval = setInterval(() => {
      if (this.state.time >= 0) {
        this.setState({
          time: this.state.time -= 1
        })
        }
      if (this.state.time <= 0) {
      clearInterval(this.myInterval)
      }
    }, 1000)
  }

  fetchPokemon() {
    let min = Math.ceil(1);
    let max = Math.floor(152);
    let pokeNum = Math.floor(Math.random() * (max - min) + min);
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
      method: 'GET'
    }).then(res => res.json())
      .then(res => {
        this.setState({
          pokeInfo: res,
          pokeSprite: res.sprites.front_default,
          pokeName: res.species.name,
          time: 10,
        })
      })
      .catch((err) => console.log(err))
  }
  
  componentDidMount() {
    setInterval(this.myInterval)
  }

  componentWillUnmount() {
    clearInterval(this.myInterval)
  }

  render() {
    return (
      <div className={'wrapper'}>
        <button className={'start'} onClick={() => (this.fetchPokemon(), this.countDown())}>Start!</button>
        <h1 className={'timer'} >Time Remaining:{this.state.time}</h1>
        {this.state.time <= 0 ? 
        <img className={'img'} src={this.state.pokeSprite} />
        :<img className={'dark'} src={this.state.pokeSprite} />}
      </div>
    )
  }
}

export default PokeFetch;