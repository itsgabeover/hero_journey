import logo from "../logo.png";

function Header({ user }) {
    return (
        <>
            {user ? (
            <div className="header">
                Welcome, { user.firstname? user.firstname : user.username }
                
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