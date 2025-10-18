import './MainPage.css';
import { Megaphone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { authApi } from '../../../utils/authApi';
import { useAuth } from '../../../utils/AuthContext';
import { formatDateOnly } from '../../../utils/common';

function MainPage() {
  /*const noticeList = [
    { id: 1, date: "2025.8.21", text: "Be-mon CLOUD 売上 更新案内" },
    { id: 2, date: "2025.8.22", text: "システムメンテナンスのお知らせ" },
    { id: 3, date: "2025.8.23", text: "新機能追加のお知らせ" },
];*/

  const [noticeList, setNoticeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, isLoggedIn} = useAuth();
  

    //notice呼び出す
    useEffect(() => {
      if (!isLoggedIn) {
        return;
      }
      fetchNotices();
    }, [isLoggedIn]);
  
    const fetchNotices = async () => {
      try {
        setLoading(true);
        const res = await authApi.get(`/notices?limit=3&sort=created_at&order=desc`);
        setNoticeList(res.data.notices);
      } catch (error) {
        console.error('Failed to fetch notices:', error);
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="main-content">
      
      {/* お知らせ　*/}
      <div className="info-box">
        <h2 className="box-title">
          <Megaphone className="notification-icon" aria-label="お知らせ" />
          お知らせ
        </h2>
        <ul className="notification-list">
          {noticeList.map((notice) => ( 
            <li key={notice.id} className="notification-item">
              <span className="date-text">【{formatDateOnly(notice.created_at)}】</span>
              <Link to={`/notices/${notice.id}`}>
              {notice.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* 売上 */}
      <div className="info-box">
        <h2 className="box-title">
          売上
        </h2>
        <div style={{ minHeight: '350px' }}>
          {/* can insert graph */}
        </div>
      </div>
    </div>
  );
}

export default MainPage;
