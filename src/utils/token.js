// JWT 토큰 저장
export const setToken = (token) => {
  localStorage.setItem('access_token', token);
};

// JWT 토큰 가져오기
export const getToken = () => {
  return localStorage.getItem('access_token');
};

// JWT 토큰 삭제
export const removeToken = () => {
  localStorage.removeItem('access_token');
};

// JWT 토큰에서 사용자 정보 디코딩
export const getUserFromToken = () => {
  const token = getToken();
  if (!token) return null;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    console.log('JWT payload:', payload); // 디버깅용
    return payload;
  } catch (error) {
    console.error('토큰 디코딩 실패:', error);
    return null;
  }
};