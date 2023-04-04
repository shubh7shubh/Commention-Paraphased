import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";


const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [users, setUsers] = useState([]);

    // const { loginWithRedirect } = useAuth0();


    // const handleEmailChange = (event) => {
    //   setEmail(event.target.value);
    // };

    // const handleNameChange = (event) => {
    //   setName(event.target.value);
    // };

    // const handlePasswordChange = (event) => {
    //   setPassword(event.target.value);
    // };

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     const user = {
    //       name: name,
    //       email: email,
    //       password: password
    //     };
    //     localStorage.setItem("user", JSON.stringify(user));
    //     setEmail('');
    //     setPassword('');
    //     setName('');
    //     navigate("/userForm")
    //   };

    //   const loginWithAuth = () => {
    //     loginWithRedirect()
    //   }



    // localStorage.setItem("token",res.data.token);

    //     useEffect(() => {
    //     if (!localStorage.getItem("token")) {
    //       navigate('/login')
    //     }
    //   }, [])


    function handleLoginButtonClick(provider) {
        switch (provider) {
            case 'linkedin':
                window.location.href = 'https://www.linkedin.com/login';
                break;
            case 'twitter':
                window.location.href = 'https://twitter.com/login';
                break;
            default:
                break;
        }
    }


    function handleLoginFormSubmit() {
        navigate('/userForm');
    }






    return <>
        {/* <div className="login_container">
      <div className="linkIn">
        <a href="#" onClick={() => handleLoginButtonClick('linkedin')}>
          <button className="linkedin-button">
            Continue with LinkedIn
          </button>
        </a>
      </div>
      <div className="Twitter">
        <a href="#" onClick={() => handleLoginButtonClick('twitter')}>
          <button className="twitter-button">
            Continue with Twitter
          </button>
        </a>
      </div>
      <form style={{"border":"none","margin-top":"-35px","margin-right":"35px"}} onSubmit={handleLoginFormSubmit}>
        {/* Login form fields */}
        {/* <button className='navigate' type="submit">Submit</button>
      </form>
    </div> */}





        <div className="login_container">
            <div className="linkIn">
                <a href="https://www.linkedin.com/oauth/v2/authorization?respo
nse_type=code&state=987654321&scope=r_liteprofile%20r_emailaddress&client_id=77i0i6u2hd04ke&redirect_uri=https://silver-clafoutis-a44fda.netlify.app/
">
                    <button className="linkedin-button">
                        Continue with LinkedIn
                    </button>
                </a>
            </div>
            <div className="Twitter">
                <a href="https://twitter.com/login">
                    <button className="twitter-button">

                        Continue with Twitter
                    </button>
                </a>
            </div>


        </div>


        {/* <a
      href="
https://www.linkedin.com/oauth/v2/authorization?respo
nse_type=code&state=987654321&scope=r_liteprofile%20r_emailaddress&client_id=77i0i6u2hd04ke&redirect_uri=https%3A%2F%2Ffunny-model-app.onrender.com%2F
"
    >
      <img src="logo.png" width="20px" height="20px" alt="" />
      Linkedin</a
    > */}




    </>
}

export default Login;