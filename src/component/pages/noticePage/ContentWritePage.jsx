import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { authApi } from '../../../utils/authApi';
import './ContentWritePage.css';

function ContentWritePage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

   //trim 삭제
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
      setLoading(true);
      await authApi.post('/notice', {
        title: title.trim(),
        content: content.trim()
      });
      alert('登録が完了しました');
      navigate('/notices');
    } catch (error) {
      console.error('Fail: Create Notice', error);
      alert('登録に失敗しました');
    } finally {
      setLoading(false);
    }
  };


   const handleCancel = () => {
    navigate('/notices');
  };



  return (
    <div className="content-write-page">
      <div className="write-container">
        <button onClick={() => navigate(-1)} className="back-button">
          <ChevronLeft size={20} />
          <span>BACK</span>
        </button>

        <div className="page-header">
          <h1 className="page-title">お知らせ</h1>
          <span className="page-subtitle">作成</span>
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
            disabled={loading}
          >
            {loading ? '登録中...' : '登録'}
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

export default ContentWritePage;