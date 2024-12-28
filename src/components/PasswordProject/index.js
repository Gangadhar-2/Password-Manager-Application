import {Component} from 'react'
import PasswordItem from '../PasswordItem'
import {v4 as uuidv4} from 'uuid'
import './index.css'

class PasswordProject extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    searchInput: '',
    isChecked: false,
    passwordsList: [],
    count: 0,
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  handleCheckboxChange = event => {
    this.setState({isChecked: event.target.checked})
  }

  DeleteUser = id => {
    const {passwordsList} = this.state
    const filteredList = passwordsList.filter(each => each.id !== id)
    this.setState({passwordsList: filteredList})
  }

  addNewPassword = event => {
    event.preventDefault()
    const {website, username, password} = this.state

    const getRandomColor = () => {
      const colorsList = this.props.colorsList // Assuming colorsList is passed as a prop
      const randomIndex = Math.floor(Math.random() * colorsList.length)
      return colorsList[randomIndex]
    }

    const newPassword = {
      id: uuidv4(),
      website,
      username,
      password,
      color: getRandomColor(), // Generate and assign a color here
      isChecked: false,
    }

    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPassword],
      website: '',
      username: '',
      password: '',
    }))
  }

  render() {
    const {website, username, password, searchInput, passwordsList} = this.state
    const {colorsList} = this.props

    const count = passwordsList.length

    const filteredPasswords = passwordsList.filter(item =>
      item.website.toLowerCase().includes(searchInput.toLowerCase()),
    )

    const showNoPasswords =
      passwordsList.length === 0 || filteredPasswords.length === 0

    return (
      <div className="bg">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="logo-img"
        />
        <div className="add-password-container">
          <form className="form-container" onSubmit={this.addNewPassword}>
            <h1 className="heading">Add New Password</h1>
            <div className="input-container">
              <p className="back-ground">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="icons"
                />
              </p>
              <input
                type="search"
                value={website}
                onChange={this.onChangeWebsite}
                className="input"
                placeholder="Enter Website"
                type="text"
              />
            </div>
            <div className="input-container">
              <p className="back-ground">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="icons"
                />
              </p>
              <input
                type="search"
                value={username}
                onChange={this.onChangeUsername}
                className="input"
                placeholder="Enter Username"
                type="text"
              />
            </div>
            <div className="input-container">
              <p className="back-ground">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="icons"
                />
              </p>
              <input
                type="password"
                value={password}
                onChange={this.onChangePassword}
                className="input"
                placeholder="Enter Password"
              />
            </div>
            <button className="add-btn" type="submit">
              Add
            </button>
          </form>
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              className="user-img"
              alt="password manager"
            />
          </div>
        </div>

        <div className="show-passwords">
          <div className="space">
            <div className="side">
              <h1 className="your">Your Passwords</h1>
              <p className="count-btn">{count}</p>
            </div>
            <div className="input-container">
              <p className="back-ground">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="icons"
                />
              </p>
              <input
                type="search"
                value={searchInput}
                onChange={this.onChangeSearchInput}
                className="input"
                placeholder="search"
              />
            </div>
          </div>
          <hr className="horizotal-line" />
          <div className="show-box">
            <input
              type="checkbox"
              checked={this.state.isChecked}
              onChange={this.handleCheckboxChange}
              className="checkbox"
            />
            <p className="show">Show Passwords</p>
          </div>
          <ul className="container">
            {showNoPasswords ? (
              <div className="no-passwords-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  alt="no passwords"
                  className="no-passwords-img"
                />
                <p className="no-passwords-text">No Passwords</p>
              </div>
            ) : (
              filteredPasswords.map(item => (
                <PasswordItem
                  key={item.id}
                  passwordDetails={item}
                  isChecked={this.state.isChecked}
                  DeleteUser={this.DeleteUser}
                />
              ))
            )}
          </ul>
        </div>
      </div>
    )
  }
}
export default PasswordProject
