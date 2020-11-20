import React, { Component } from 'react'

class Header extends Component {

  render () {
    return (
      <div className="sc-header">
        <img className="sc-header--img" src={this.props.imageUrl} alt="" />
        <div className="sc-header--team-name"> {this.props.teamName} </div>
        <div className="sc-header--close-button" onClick={this.props.onClose}>
          <img src="https://hellocashback.me/themes/hellocashbackua/assets/img/chat/close-icon.png" alt=""/>
        </div>
      </div>
    )
  }
}

export default Header
