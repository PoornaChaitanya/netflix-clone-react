import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EmailCTA.css";

const EmailCTA = ({ large = false }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    if (!email.trim()) {
      alert("Please enter your email");
      return;
    }

    navigate("/login", { state: { email } });
  };

  return (
    <div className="container">
    <div className={`email-cta ${large ? "large" : ""}`}>
      <p>
        Ready to watch? Enter your email to create or restart your membership.
      </p>
      <div className="input-section">
        <div className="input-wrapper">
          <input
            type="email"
            required
            placeholder=" "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Email address</label>
        </div>

        <button className="cta-btn" onClick={handleSubmit}>
          Get Started <span>{">"}</span>
        </button>
      </div>
    </div>
    </div>
  );
};

export default EmailCTA;
