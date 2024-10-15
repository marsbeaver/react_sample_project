import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();
    const handleHome = () => {
        navigate('/');
    };
    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={handleHome}>Home</button>
        </div>
    );
}
export default Dashboard;