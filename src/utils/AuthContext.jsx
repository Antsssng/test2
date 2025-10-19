import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { authApi } from './authApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ user_id: '1', name: 'test', role: 'admin' });
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [loading, setLoading] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    console.log('🔵 [AuthContext] useEffect 시작', new Date().getTime());
    //setLoading(true);
    //checkToken();
  }, [navigate]);

  const checkToken = async() => {
      if (window.location.pathname === '/login') {
        console.log('🔵 [AuthContext] 로그인 페이지, 종료');
        setLoading(false);
        return;
      }

      console.log('🔵 [AuthContext] refresh 요청 시작...');
      try {
        const res = await axios.post('http://localhost:8001/api/auth/refresh', {}, { withCredentials: true });
        localStorage.setItem('access_token', res.data.access_token);
        console.log('🔵 [AuthContext] 토큰 저장 완료 ✅');

        const name = localStorage.getItem('name');
        const role = localStorage.getItem('role');
        const user_id = localStorage.getItem('user_id');
        if (name && role && user_id) {
          setUser({ name, role, user_id });
          setIsLoggedIn(true);
        }

        setLoading(false);
        console.log('🔵 [AuthContext] loading = false, children 렌더링 시작');
      } catch (err) {
        console.log('🔵 [AuthContext] refresh 실패, 로그인 페이지로 이동');
        setLoading(false);
        navigate('/login');
      }
    };


  const login = async (employee_id, employee_pw) => {
    const res = await axios.post('http://localhost:8001/api/auth/login', { employee_id, employee_pw }, { withCredentials: true });
    const { access_token, user_id, name, role } = res.data;

    localStorage.setItem('access_token', access_token);
    localStorage.setItem('user_id', user_id);
    localStorage.setItem('name', name);
    localStorage.setItem('role', role);
    
    setUser({ user_id, name, role });
    setIsLoggedIn(true);
  };

  const logout = async () => {
    try {
      await authApi.post('/auth/logout', {}, {withCredentials: true});
    } catch (err) {
      console.warn('로그아웃 실패', err);
    }

    localStorage.removeItem('access_token');
    localStorage.removeItem('name');
    localStorage.removeItem('role');
    localStorage.removeItem('user_id');

    setUser(null);
    setIsLoggedIn(false);
  };

  if (loading) {
    return <div style={{ width: '100%', height: '100vh', backgroundColor: 'white' }}></div>;
  }

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
