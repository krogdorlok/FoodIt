import React , {useState} from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
//similar to sign up but the only difference here will be:-
//1. the end point(localhost path) shall be different this time, since now we are not creating the user and instead 
//logging in an existing user.
//2. the login page requires only the email and the password and nothing else, so that shall be removed
export default function Login() {
  const [information, setinformation] = useState({email:'',password:''})
  const navigate = useNavigate();
  const handleSubmit=async(e)=>{
      e.preventDefault();
      console.log(JSON.stringify({ email:information.email, password:information.password}));
      const response = await fetch("http://localhost:8000/api/loginuser",{//POST fetch api is an inbuilt function
      method:'POST',
      headers: {
          'Content-Type':'application/json'
      }, 
      body:JSON.stringify({email:information.email, password:information.password})
  })
  const json = await response.json()
  console.log(json);

  if(!json.success)
  alert("enter valid creds")

  if(json.success)
  localStorage.setItem("userEmail", information.email)
  localStorage.setItem("authtoken", json.authtoken)
  navigate("/")
  }



const onChange = (event)=>{
  setinformation({...information , [event.target.name]:event.target.value })
}

  return (
    <div>
      <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                    <input type="email" className="form-control" name='email' value={information.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
{/*onChange allows us to make changes in the email, pw sections, else
    they shall always remain static, meaning, they wont allow any change in them*/}
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' value={information.password} onChange={onChange} id="exampleInputPassword1" aria-describedby="passwordHelp" />
                </div>
                <button type="submit" className="btn btn-success">Submit</button>
                <Link to="/createuser" className='m-3 btn btn-danger'>I'm a new User</Link>
            </form>
        </div>
    </div>
  )

}

