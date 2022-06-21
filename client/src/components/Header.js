import logo from "../logo.png";

function Header({ user }) {
    return (
        <>
            {user ? (
            <div className="header">
                Welcome, {user.first_name}
            </div>
        ) : (
            <div className="header">
                Welcome, Hero
            </div>
            )}
        </>
    )
  }
  
  export default Header;