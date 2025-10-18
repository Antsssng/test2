import { AlertTriangle } from 'lucide-react';

function DeleteConfirmModal({ isOpen, onClose, onConfirm }) {
    if (!isOpen) return null;

return (
    <>
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-icon">
                    <AlertTriangle size={48} color="#e74c3c" />
                </div>
                <h2 className="modal-title">本当に削除しますか?</h2>
                <div className="modal-actions">
                    <button onClick={onConfirm} className="modal-btn modal-btn-delete">
                     削除
                    </button>
                <button onClick={onClose} className="modal-btn modal-btn-cancel">
                     キャンセル
                </button>
                </div>
                
                </div>
            </div>
 <style>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          animation: fadeIn 0.2s ease-out;
        }

        .modal-content {
          background: white;
          border-radius: 12px;
          padding: 32px;
          max-width: 420px;
          width: 90%;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          text-align: center;
          animation: slideUp 0.3s ease-out;
        }

        .modal-icon {
          margin-bottom: 20px;
          display: flex;
          justify-content: center;
        }

        .modal-title {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 28px;
          color: #333;
        }

        .modal-actions {
          display: flex;
          gap: 12px;
          justify-content: center;
        }

        .modal-btn {
          padding: 12px 32px;
          border: none;
          border-radius: 6px;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          min-width: 120px;
        }

        .modal-btn-delete {
          background: #dc3545;
          color: white;
        }

        .modal-btn-delete:hover {
          background: #c82333;
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(220, 53, 69, 0.3);
        }

        .modal-btn-cancel {
          background: #6c757d;
          color: white;
        }

        .modal-btn-cancel:hover {
          background: #5a6268;
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(108, 117, 125, 0.3);
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}

export default DeleteConfirmModal;