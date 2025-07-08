import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [sentOtp, setSentOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  // Step 1: Send OTP
  const handleSendOtp = () => {
    if (!mobile.match(/^[6-9]\d{9}$/)) {
      alert("Enter a valid 10-digit mobile number");
      return;
    }

    const generated = Math.floor(100000 + Math.random() * 900000).toString();
    setSentOtp(generated);
    alert(`OTP sent to ${mobile}: ${generated}`); // Simulated send
    setStep(2);
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = () => {
    if (otp === sentOtp) {
      setStep(3);
    } else {
      alert("Invalid OTP");
    }
  };

  // Step 3: Change Password
  const handleChangePassword = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Simulated success
    alert("Password changed successfully!");
    navigate("/login");
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card shadow p-4"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <h4 className="text-center text-primary mb-4">Forgot Password</h4>

        {step === 1 && (
          <>
            <label className="form-label">Mobile Number</label>
            <input
              type="text"
              className="form-control mb-3"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Enter registered mobile number"
            />
            <button className="btn btn-primary w-100" onClick={handleSendOtp}>
              Send OTP
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <label className="form-label">Enter OTP</label>
            <input
              type="text"
              className="form-control mb-3"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter the OTP"
            />
            <button className="btn btn-success w-100" onClick={handleVerifyOtp}>
              Verify OTP
            </button>
          </>
        )}

        {step === 3 && (
          <form onSubmit={handleChangePassword}>
            <div className="mb-3 position-relative">
              <label className="form-label">New Password</label>
              <input
                type={showNewPassword ? "text" : "password"}
                className="form-control"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <i
                className={`bi ${
                  showNewPassword ? "bi-eye-slash" : "bi-eye"
                } position-absolute`}
                style={{ top: "38px", right: "15px", cursor: "pointer" }}
                onClick={() => setShowNewPassword(!showNewPassword)}
              ></i>
            </div>

            <div className="mb-3 position-relative">
              <label className="form-label">Confirm New Password</label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <i
                className={`bi ${
                  showConfirmPassword ? "bi-eye-slash" : "bi-eye"
                } position-absolute`}
                style={{ top: "38px", right: "15px", cursor: "pointer" }}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              ></i>
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Change Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
