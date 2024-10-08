import { Link } from "react-router-dom";
export default function About() {
  return (
    <>
      <div className="about-container">
        <h2>ABOUT ME</h2>
        <div className="about-body">
          <p>
            i am a passionate and dynamic full-stack developer. i like to make a
            difference in the world wherever possible.
          </p>
        </div>
      </div>

      <div className="upto-container">
        <h2>WHAT I'M UP TO</h2>
        <div className="upto-body">
          <p>
            i am currently in my third semester of the software development
            program at SAIT.
          </p>
          <p>
            on the side, i do freelance work through{" "}
            <a href="https://gritmedium.com" target="_blank" rel="noreferrer">
              grit medium digital marketing.
            </a>{" "}
            this normally includes work such as building sites or managing
            wordpress instances.
          </p>
        </div>
      </div>
      {/*<div className="upto-container">
        <h2>WHAT I'M UP TO</h2>
        <div className="upto-body">
          <p>i'm currently working on <Link to='/projects'>several side-projects</Link>.</p>
          <p>one is an entry system for a local business that i am developing alongside a small team that utilizes react, next.js, and vercel.</p>  
          <p>another is a full-stack application using next.js.</p>
        </div>
      </div>*/}
    </>
  );
}

