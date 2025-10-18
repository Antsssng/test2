import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../../../utils/AuthContext";
import './LoginPage.css'; 



function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [employeeId,setEmployeeId] = useState('');
  const [employeePw,setEmployeePw] = useState('');
  const [showPassword,setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!employeeId || !employeePw) {
      alert("IDとPasswordを入力してください");
      return;
    }

    try {
      await login(employeeId, employeePw);
      navigate('/');
    } catch (err) {
      alert("ログインに失敗しました");
    }
  };

  return (
    <div className="login-container">
      <div className="logoBox">
        <div className="logo-area">
          <h1>BeConn</h1>
        </div>

        <div className="form-area">
          <div className="input-box">
            <label>ID</label>
            <input
              type="text" 
              value={employeeId} 
              onChange={(e) => setEmployeeId(e.target.value)} 
            />
          </div>

          <div className="input-box">
            <label>Password</label>
            <div className="password-wrapper">
              <input 
                type={showPassword ? "text" : "password"} 
                value={employeePw} 
                onChange={(e) => setEmployeePw(e.target.value)} 
              />
              <button 
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
              </button>
            </div>
          </div>

          <button className="login-button" onClick={handleLogin}>
            ログイン
          </button>
        </div>
      </div>
    </div>
  );
}
export default LoginPage