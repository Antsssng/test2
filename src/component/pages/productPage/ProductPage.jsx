import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../../../utils/authApi";
import { useAuth } from "../../../utils/AuthContext"; 
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreVertical } from 'lucide-react';
import Dialog from "../../layout/Dialog";
import "../../../utils/common.css";
import CommonTable from "../../layout/CommonTable";

function ProductsPage() {
  const navigate = useNavigate();
  const {user, isLoggedIn} = useAuth();

  const [loading, setLoading] = useState(false);
  //const [products, setProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newRemark, setNewRemark] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [NextPage, setNextPage] = useState(false);
  const [limit, setLimit] = useState(10);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const [openDropdownId, setOpenDropdownId] = useState(null);
  const dropdownRef = useRef(null);

  // const isDuplicate = products.some(
  //   (p) => p.product_name.trim() === newName.trim()
  // );

  const products = [
    {
      id: 1,
      product_name: '프로덕트 1',
      remark: '홍길동'
    },
    {
      id: 2,
      product_name: '프로덕트 2',
      remark: '김철수',
    },
    {
      id: 3,
      product_name: '프로덕트 3',
      remark: '이영희',
    },
  ];

  const columns = [
    { key: "logo", label: "ロゴ", className: "col-logo" },
    { key: "product_name", label: "プロダクト名", className: "col-name" },
    { key: "actions", label: "詳細", className: "col-actions" },
    { key: "remark", label: "備考", className: "col-remark" },
    { key: "menu", label: "", className: "col-menu" },
  ];
  
  const [totalPages, setTotalPages] = useState(2);


  // useEffect 外に関数化(page1だと即時反映できない)
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await authApi.get(`/products?page=${currentPage}&limit=${limit}`);
      setProducts(res.data.products || []);
  
      const total = res.data.total || 0; // 総件数
      const totalPages = Math.ceil(total / 10); // 総ページ数
      setNextPage(pageNumber < totalPages); // 総ページ数より少なければ次ページあり
    } catch (error) {
      console.error("API呼び出しエラー:", error);
      setProducts([]);
      setNextPage(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    //fetchProducts();
  }, [currentPage, isLoggedIn, user]);
  

  // プロダクト一覧取得
  /*useEffect(() => {
    setLoading(true);
    //console.log("useEffect発動", localStorage.getItem("access_token"));
    const fetchProducts = async () => {
      //setToken(localStorage.getItem("access_token"));
      //if (!token) return; // token がなければ処理しない
      try {
        const res = await authApi.get(`/products?page=${page}`);
        console.log("APIレスポンス:", res.data);
        setProducts(res.data.products || []);
        setNextPage(res.data.products.length === 10); // limit と合わせる
      } catch (error) {
        console.error("API呼び出しエラー:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, [token, page]); */
  

  // 新しいプロダクトを追加
  // const handleAddProduct = async () => {
  //   try {
  //     const res = await authApi.post("/product", {
  //       product_name: newName,
  //       remark: newRemark,
  //     });

  //     setMessage(res.data.msg || "登録しました");
  //     setMessageType("success");
  //     setTimeout(() => setMessage(""), 3000);

  //     setPage(1); 
  //     fetchProducts(1);

  //     setNewName("");
  //     setNewRemark("");
  //     setIsOpen(false);
  //   } catch (error) {
  //     const errMsg = error.response?.data?.error || "登録に失敗しました";
  //     setMessage(errMsg);
  //     setMessageType("error");
  //     setTimeout(() => setMessage(""), 3000);
  //   }
  // };

  // プロダクト更新
  // const handleUpdateProduct = async (product) => {
  //   try {
  //     const res = await authApi.put(`/product/${product.id}`, {
  //       product_name: product.product_name,
  //       remark: product.remark,
  //     });

  //     setMessage(res.data.msg || "更新しました");
  //     setMessageType("success");
  //     setTimeout(() => setMessage(""), 3000);

  //     setProducts((prev) =>
  //       prev.map((p) => (p.id === product.id ? product : p))
  //     );

  //     setEditingProduct(null);
  //   } catch (error) {
  //     const errMsg = error.response?.data?.error || "更新に失敗しました";
  //     setMessage(errMsg);
  //     setMessageType("error");
  //     setTimeout(() => setMessage(""), 3000);
  //   }
  // };
  

  // プロダクト削除
  // const handleDeleteConfirmed = async () => {
  //   if (!deleteTarget) return;

  //   try {
  //     const res = await authApi.delete(`/product/${deleteTarget.id}`);

  //     setMessage(res.data.msg || "削除しました");
  //     setMessageType("success");
  //     setTimeout(() => setMessage(""), 3000);

  //     const newProducts = products.filter((p) => p.id !== deleteTarget.id);
  //     setProducts(newProducts);
  //     setNextPage(newProducts.length === 10);
  //     setDeleteTarget(null);
  //   } catch (error) {
  //     const errMsg = error.response?.data?.error || "削除に失敗しました";
  //     setMessage(errMsg);
  //     setMessageType("error");
  //     setTimeout(() => setMessage(""), 3000);
  //     setDeleteTarget(null);
  //   }
  // };
  
  

  return (
    <div className="list-page">
      <div className="container">
        <h1 className="page-title">プロダクト一覧</h1>

        <div>
          <div className="actions-bar">
            <div className="search-group">
              <div className="search-input-wrapper">
              </div>
            </div>
            <button className="btn btn-primary"onClick={() => setIsOpen(true)}>登録</button>
          </div>

          <CommonTable
            columns={columns}
            data={products}
            loading={loading}
            emptyMessage="プロダクトがありません"
            renderRow={(product) => (
              <tr key={product.id}>
                <td className="col-no">Logo</td>
                <td className="col-name">{product.product_name}</td>
                <td className="col-actions">
                  <Link to={`/products/${product.id}/plan`}>
                    <button>プラン</button>
                  </Link>
                  <Link to={`/contracts?product_id=${product.id}`}>
                    <button>契約</button>
                  </Link>
                </td>
                <td className="col-remark">{product.remark}</td>
                <td className="col-menu">
                  <div
                    className="menu-wrapper"
                    ref={openDropdownId === product.id ? dropdownRef : null}
                  >
                    <button
                      className="menu-button"
                      onClick={() =>
                        setOpenDropdownId(openDropdownId === product.id ? null : product.id)
                      }
                    >
                      <MoreVertical size={20} />
                    </button>
                    {openDropdownId === product.id && (
                      <div className="menu-dropdown">
                        <button className="menu-item">編集</button>
                        <button className="menu-item menu-item-danger">削除</button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            )}
          />
     
    

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

          {/* 여기까지 수정 */}

      {/* 登録用ダイアログ */}
      {isOpen && (
  <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
    <div>
      <input
        type="text"
        placeholder="プロダクト名"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="備考"
        value={newRemark}
        onChange={(e) => setNewRemark(e.target.value)}
      />
      <br />
      {products.some(p => p.product_name.trim() === newName.trim()) && (
        <p style={{ color: "red", fontSize: "12px" }}>
          このプロダクト名はすでに存在します
        </p>
      )}
      <button
        onClick={handleAddProduct}
        disabled={!newName.trim() || products.some(p => p.product_name.trim() === newName.trim())}
      >
        登録
      </button>
    </div>
  </Dialog>
)}

      {/* 編集用ダイアログ */}
      {editingProduct && (
  <Dialog title="プロダクト編集" onClose={() => setEditingProduct(null)}>
    <div>
      <input
        type="text"
        placeholder="プロダクト名"
        value={editingProduct.product_name}
        onChange={(e) =>
          setEditingProduct({
            ...editingProduct,
            product_name: e.target.value,
          })
        }
      />
      <br />
      {products.some(p => p.product_name.trim() == editingProduct.product_name.trim() && p.id !== editingProduct.id) && (
        <p style={{ color: "red", fontSize: "12px" }}>
          このプロダクト名はすでに存在します
        </p>
      )}
      <input
        type="text"
        placeholder="備考"
        value={editingProduct.remark}
        onChange={(e) =>
          setEditingProduct({
            ...editingProduct,
            remark: e.target.value,
          })
        }
      />
      <br />
      <button
        onClick={() => handleUpdateProduct(editingProduct)}
        disabled={products.some(p => p.product_name.trim() === editingProduct.product_name.trim() && p.id !== editingProduct.id)}
      >
        更新
      </button>
    </div>
  </Dialog>
)}

 {/* 削除用ダイアログ */}
{deleteTarget && (
  <Dialog
    title="確認"
    onClose={() => setDeleteTarget(null)}
  >
    <p>{deleteTarget.product_name} を削除しますか？</p>
    <button onClick={handleDeleteConfirmed}>削除</button>
  </Dialog>
)}

    </div>
    </div>
    
    </div>
  );
}

export default ProductsPage;
