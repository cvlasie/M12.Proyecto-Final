import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [error, setError] = useState("");
  const [IsLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSumbit = async (e) => {
    const formData = new FormData(e.target);

    e.preventDefault()
    setIsLoading(true)
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    try {

      const res = await axios.post("http://localhost:8800/api/auth/register",{
        username,email,password
      });

      navigate("/login")
    }catch(err){
      console.log(err)
      setError(err.response.data.message)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSumbit}>
          <h1>Welcome back</h1>
          <input name="username" required minLength={3} maxLength={20} type="text" placeholder="Username" />
          <input name="password" type="password" required placeholder="Password" />
          <button disabled={isLoading}>Login</button>
          {error && <span>{error}</span>}
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;
