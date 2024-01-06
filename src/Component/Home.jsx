import React from "react";
import Signup from "./Signup";
import backgroundImage from '../Assest/Images/background.jpg'
function Home()
{
    const backgroundStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "90vh", // Set the fixed height
        width: "100%", // Set the width to cover the entire page
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff", // Example text color
      };
    
    
    return(
        <React.Fragment>
             <div className="your-component" style={backgroundStyle}>
            <div className="container">
                <Signup/>
                    </div>
    </div>
        </React.Fragment>
    );
}
export default Home;