import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreVertical } from 'lucide-react';
import DeleteConfirmModal from '../../layout/DeleteConfirmModal';
import { authApi } from '../../../utils/authApi';
import { useAuth } from '../../../utils/AuthContext';
import { formatDate } from '../../../utils/common';
import './NoticePage.css';

function NoticePage() {
  const navigate = useNavigate();
  const { user, isLoggedIn} = useAuth();
  const [notices, setNotices] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const dropdownRef = useRef(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen]= useState(false);
  const [selectedNoticeId, setSelectedNoticeId]=useState(null);

  
  const fetchNotices = async () => {
    try {
      setLoading(true);
      const res = await authApi.get(`/notices?page=${currentPage}&limit=10`);
      setNotices(res.data.notices);
      setTotalPages(res.data.pageCount);
    } catch (error) {
      console.error('Failed to fetch notices:', error);
    } finally {
      setLoading(false);
    }
  };
  

  const handleSearch = () => {
    console.log('Search:', searchQuery);
    
  };

  const handleNoticeClick = (noticeId) => {
    console.log('🔵 클릭됨! noticeId:', noticeId);
    navigate(`/notices/${noticeId}`);
  };

  const handleEdit = (e, noticeId) => {
    e.stopPropagation();
    navigate(`/notices/${noticeId}/edit`);
  };

  const openDeleteModal = (e, noticeId) => {
    e.stopPropagation();
    setSelectedNoticeId(noticeId);
    setIsDeleteModalOpen(true);
    setOpenDropdownId(null);
  };

  
  const handleDelete = async () => {
    if (!selectedNoticeId) return;
    try {
      await authApi.delete(`/notice/${selectedNoticeId}`);
      setIsDeleteModalOpen(false);
      setSelectedNoticeId(null);
      fetchNotices();
    } catch (error) {
      console.error('Failed to delete notice:', error);
      alert('削除に失敗しました');
    }
  };
  
  /*
  const formatDate = (dateString) => {
    if (!dateString) return '';
    return dateString.slice(0, 16).replace('T', ' ');
    };*/
    
    
  const goToPage = (page) => {
    if (page >= 1) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    fetchNotices();
  }, [currentPage, isLoggedIn]);
  
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdownId(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  
  return (
    <div className="notice-list-page">
      <div className="container">
        <button onClick={() => navigate(-1)} className="back-button">
          <ChevronLeft size={20} />
          <span>BACK</span>
        </button>

        <h1 className="page-title">お知らせ一覧</h1>

        <div className="actions-bar">
          <div className="search-group">
            <div className="search-input-wrapper">
              <Search className="search-icon" size={18} />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
            <button onClick={handleSearch} className="btn btn-primary">
              検索
            </button>
          </div>

          {user?.role === 'admin' && (
            <Link to="/notice/write" className="btn btn-primary">
              作成
            </Link>
          )}
        </div>

        <div className="table-wrapper">
          <table className="notice-table">
            <thead>
              <tr>
                <th className="col-no">No.</th>
                <th className="col-title">タイトル</th>
                <th className="col-creator">作成</th>
                <th className="col-updater">更新者</th>
                {user?.role === 'admin' && <th className="col-menu"></th>}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={user?.role === 'admin' ? 5 : 4} className="loading-cell">
                    読み込み中...
                  </td>
                </tr>
              ) : notices.length === 0 ? (
                <tr>
                  <td colSpan={user?.role === 'admin' ? 5 : 4} className="empty-cell">
                    お知らせがありません
                  </td>
                </tr>
              ) : (
                notices.map((notice, index) => (
                  <tr
                    key={notice.id}
                    className="notice-row"
                    onClick={() => handleNoticeClick(notice.id)}
                  >
                    <td>{(currentPage - 1) * 10 + index + 1}</td>
                    <td>{notice.title}</td>
                    <td>
                      <div className="notice-user-info">
                        <div className="notice-user-name">{notice.created_user_name}</div>
                        <div className="notice-user-date">{formatDate(notice.created_at)}</div>
                      </div>
                    </td>
                    <td>
                      <div className="notice-user-info">
                        <div className="notice-user-name">{notice.updated_user_name}</div>
                        <div className="notice-user-date">{formatDate(notice.updated_at)}</div>
                      </div>
                    </td>
                    {user?.role === 'admin' && (
                      <td className="menu-cell">
                        <div className="menu-wrapper" ref={openDropdownId === notice.id ? dropdownRef : null}>
                          <button
                            className="menu-button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenDropdownId(openDropdownId === notice.id ? null : notice.id);
                            }}
                          >
                            <MoreVertical size={20} />
                          </button>
                          {openDropdownId === notice.id && (
                            <div className="menu-dropdown">
                              <button
                                onClick={(e) => {
                                  handleEdit(e, notice.id);
                                  setOpenDropdownId(null);  }}
                                className="menu-item"
                              >
                                編集
                              </button>
                              <button
                                onClick={(e) => {
                                  openDeleteModal(e, notice.id);
                             
                                }}
                                className="menu-item menu-item-danger"
                              >
                                削除
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* 페이지네이션 - goToPage 함수 사용 */}
        <div className="pagination">
          <button
            onClick={() => goToPage(1)}
            disabled={currentPage === 1}
            className="pagination-button"
          >
            <ChevronsLeft size={18} />
          </button>
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="pagination-button"
          >
            <ChevronLeft size={18} />
          </button>

          <button className="pagination-button active">{currentPage}</button>
          {currentPage < totalPages && (
            <button
              onClick={() => goToPage(currentPage + 1)}
              className="pagination-button"
            >
              {currentPage + 1}
            </button>
          )}
          {currentPage + 1 < totalPages && (
            <span className="pagination-dots">...</span>
          )}
          {currentPage + 1 < totalPages && (
            <button
              onClick={() => goToPage(totalPages)}
              className="pagination-button"
            >
              {totalPages}
            </button>
          )}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="pagination-button"
          >
            <ChevronRight size={18} />
          </button>
          <button
            onClick={() => goToPage(totalPages)}
            disabled={currentPage === totalPages}
            className="pagination-button"
          >
            <ChevronsRight size={18} />
          </button>
        </div>
      </div>

          <DeleteConfirmModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={handleDelete}
          />
    </div>
  );
}

export default NoticePage;