import { useNavigate } from "react-router";

const HomePage= ()=>{
    const navigate = useNavigate();
    return(
        <>
        <div className="home-container">
        <h1 className="home-title"> Welcome to the CV Builder</h1>
        <p className="home-description">
        Create professional CVs quickly and efficiently. You can create multiple CVs and manage them all in one place.</p>
        <button className="home-btn" onClick={()=>{navigate ("/step1")}} >Create CV</button>
        </div>
        </>
    )
}
export default HomePage;