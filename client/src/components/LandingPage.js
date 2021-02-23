import React from "react";
import { Link } from "react-router-dom";
import Particles from "react-particles-js";

const LandingPage = () => {
  return (
    <div className="landingpage" style={{ backgroundColor: "black" }}>
      <Particles
        params={{
          particles: {
            number: {
              value: 50,
            },
            size: {
              value: 3,
            },
          },
          interactivity: {
            events: {
              onhover: {
                enable: true,
                mode: "repulse",
              },
            },
          },
        }}
      />

      <div className="landingpage__welcome"> Welcome to Mini Casino</div>
      <Link to="/gamelib" className="landingpage__gamelib">
        To Popular Games
      </Link>
    </div>
  );
};

export default LandingPage;
