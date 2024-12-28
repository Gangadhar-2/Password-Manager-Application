import './index.css'

const PasswordItem = ({passwordDetails, isChecked, DeleteUser}) => {
  const {website, username, password, id, color} = passwordDetails

  const onClickDelete = () => {
    DeleteUser(id)
  }

  const firstLetter = username ? username.charAt(0).toUpperCase() : ''

  return (
    <li className="password-item">
      <p className="letter" style={{backgroundColor: color}}>
        {' '}
        {/* Use the stored color */}
        {firstLetter}
      </p>
      <div className="details-container">
        <p className="para">{website}</p>
        <p className="para">{username}</p>
        <p>
          {isChecked ? (
            password
          ) : (
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              className="password-img"
              alt="stars"
            />
          )}
        </p>
      </div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
        className="delete-img"
        onClick={onClickDelete}
        alt="delete"
        data-testid="delete"
      />
    </li>
  )
}
export default PasswordItem
