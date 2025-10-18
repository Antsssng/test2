import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { authApi } from '../../../utils/authApi';
import './ContentPage.css';

function ContentPage() {
  const { noticeId } = useParams();
  const navigate = useNavigate();
  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const res = await authApi.get(`/notice/${noticeId}`);
        console.log('API Response:', res.data);
        setNotice(res.data.notice);
        setLoading(false);
      } catch (error) {
        console.error('Failed', error);
        setLoading(false);
      }
    };

    fetchNotice();
  }, [noticeId]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return dateString.slice(0, 16).replace('T', ' ');
  };

  if(loading) {
    return (
      <div className="content-page">
        <div className="loading-container">
          <div className="loading-message">読み込み中。。。</div>
        </div>
      </div>
    );
  }

  if(!notice) {
      return null;
  }

  return (
    <div className="content-page">
      <div className="content-container">
         <h1>ContentPage</h1>
      <p>お知らせ ID: {noticeId}</p>
        <button onClick={() => navigate('/notices')} className="back-button">
          <ChevronLeft size={20} />
          <span>BACK</span>
        </button>

        <h1 className="page-title">お知らせ</h1>

        <div className="notice-detail">
          <div className="notice-title-section">
            <h2 className="notice-title">{notice.title}</h2>
          </div>

          <div className="notice-meta">
            <div className="meta-item">
              <span className="meta-label">作成者:</span>
              <span className="meta-value">{notice.created_user_name}</span>
              <span className="meta-label">更新者:</span>
              <span className="meta-value">{notice.updated_user_name}</span>
            </div>
            <div className="meta-dates">
              <span className="meta-date">作成日時: {formatDate(notice.created_at)}</span>
              <span className="meta-date">更新日時: {formatDate(notice.updated_at)}</span>
            </div>
          </div>

          <div className="notice-content-box">
            <div className="content-label">内容</div>
            <div className="notice-content">{notice.content}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContentPage