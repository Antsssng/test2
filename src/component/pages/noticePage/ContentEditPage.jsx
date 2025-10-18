import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { authApi } from '../../../utils/authApi';
import './ContentEditPage.css';

function ContentEditPage() {
  const { noticeId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const response = await authApi.get(`/notice/${noticeId}`);
        setTitle(response.data.notice.title);
        setContent(response.data.notice.content);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch notice:', error);
        alert('お知らせの読み込みに失敗しました');
        navigate('/notices');
      }
    };
    fetchNotice();
  }, [noticeId, navigate]);

  const handleSubmit = async () => {
    if (!title.trim()) {
      alert('タイトルを入力してください');
      return;
    }
    if (!content.trim()) {
      alert('内容を入力してください');
      return;
    }

    try {
      setSubmitting(true);
      await authApi.put(`/notice/${noticeId}`, {
        title: title.trim(),
        content: content.trim()
      });
      alert('更新が完了しました');
      navigate('/notices');
    } catch (error) {
      console.error('Failed to update notice:', error);
      alert('更新に失敗しました');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/notices');
  };

  if (loading) {
    return (
      <div className="content-edit-page">
        <div className="loading-container">
          <div className="loading-message">読み込み中...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="content-edit-page">
      <div className="write-container">
        <button onClick={() => navigate(-1)} className="back-button">
          <ChevronLeft size={20} />
          <span>BACK</span>
        </button>

        <div className="page-header">
          <h1 className="page-title">お知らせ</h1>
          <span className="page-subtitle">編集</span>
        </div>

        <div className="form-group">
          <label className="form-label">タイトル</label>
          <input
            type="text"
            className="form-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="タイトルを入力してください"
          />
        </div>

        <div className="form-group">
          <label className="form-label">内容</label>
          <textarea
            className="form-textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="内容を入力してください"
            rows={15}
          />
        </div>

        <div className="button-group">
          <button
            onClick={handleSubmit}
            className="btn btn-submit"
            disabled={submitting}
          >
            {submitting ? '更新中...' : '更新'}
          </button>

           <button
            onClick={handleCancel}
            className="btn btn-cancel"
            disabled={loading}
          >
            キャンセル
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContentEditPage;
