import { useState, useEffect } from "react";
// import axios from "axios";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [/*userMobile,*/ setUserMobile] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [sentOtp, setSentOtp] = useState("");
  const [form, setForm] = useState({
    otp: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const mobile = JSON.parse(localStorage.getItem("user"))?.mobile;
    if (mobile) setUserMobile(mobile);
  }, /*[]*/);

  //   const sendOtp = async () => {
  //     try {
  //       const res = await axios.post("/api/auth/send-otp", {
  //         mobile: userMobile,
  //       });
  //       alert(res.data.message);
  //       setOtpSent(true);
  //     } catch (err) {
  //       alert("Failed to send OTP");
  //     }
  //   };

  const sendOtp = () => {
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setSentOtp(generatedOtp);
    // alert(`OTP sent to ${userMobile}: ${generatedOtp}`);
    alert(`OTP sent to ${9876543210}: ${generatedOtp}`);
    setOtpSent(true);
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.otp !== sentOtp) {
      alert("Invalid OTP");
      return;
    }

    if (form.newPassword !== form.confirmNewPassword) {
      alert("Passwords do not match");
      return;
    }

    alert("Your password has been changed successfully!");
    navigate("/"); // Simulate redirect
  };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     if (form.newPassword !== form.confirmNewPassword) {
  //       alert("Passwords do not match");
  //       return;
  //     }

  //     try {
  //       const res = await axios.post("/api/auth/change-password", {
  //         mobile: userMobile,
  //         otp: form.otp,
  //         newPassword: form.newPassword,
  //       });
  //       alert(res.data.message);
  //       navigate("/");
  //     } catch (err) {
  //       alert("Failed to change password: " + err.response?.data?.message);
  //     }
  //   };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h4 className="text-center text-primary mb-4">Change Password</h4>

      <div className="mb-3">
        <label htmlFor="mobile" className="form-label fw-bold">
          Mobile Number
        </label>
        <input
          type="text"
          id="mobile"
          className="form-control"
          value={9876543210}
        //   value={userMobile}
          readOnly
        />
      </div>

      <button className="btn btn-outline-primary mb-3" onClick={sendOtp}>
        Send OTP
      </button>

      {otpSent && (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Enter OTP</label>
            <input
              type="text"
              name="otp"
              value={form.otp}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label>New Password</label>
            <input
              type="password"
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label>Confirm New Password</label>
            <input
              type="password"
              name="confirmNewPassword"
              value={form.confirmNewPassword}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <button className="btn btn-primary w-100">Change Password</button>
        </form>
      )}
    </div>
  );
};

export default ChangePassword;
