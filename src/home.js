import { useNavigate } from 'react-router-dom';
function Home() {
    const navigate = useNavigate();
    const handleSignup = () => {
        navigate('/signup');
    };
    const handleLogin = () => {
        navigate('/login');
    };
    return (<div>
        <h1>Home</h1>
        <button onClick={handleSignup}>Signup</button>
        <button onClick={handleLogin}>Login</button>
    </div>);
}

export default Home;