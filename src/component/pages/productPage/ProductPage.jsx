import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { authApi } from "../../../utils/authApi";
import { useAuth } from "../../../utils/AuthContext"; 
import Dialog from "../../layout/Dialog";

function ProductsPage() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newRemark, setNewRemark] = useState("");
  const [page, setPage] = useState(1);
  const [NextPage, setNextPage] = useState(false);
  const token = useAuth();
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const isDuplicate = products.some(
    (p) => p.product_name.trim() === newName.trim()
  );


  // useEffect 外に関数化(page1だと即時反映できない)
  const fetchProducts = async (pageNumber = page) => {
    setLoading(true);
    try {
      const res = await authApi.get(`/products?page=${pageNumber}&limit=10`);
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
    fetchProducts();
  }, [token, page]);
  

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
  const handleAddProduct = async () => {
    try {
      const res = await authApi.post("/product", {
        product_name: newName,
        remark: newRemark,
      });

      setMessage(res.data.msg || "登録しました");
      setMessageType("success");
      setTimeout(() => setMessage(""), 3000);

      setPage(1); 
      fetchProducts(1);

      setNewName("");
      setNewRemark("");
      setIsOpen(false);
    } catch (error) {
      const errMsg = error.response?.data?.error || "登録に失敗しました";
      setMessage(errMsg);
      setMessageType("error");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  // プロダクト更新
  const handleUpdateProduct = async (product) => {
    try {
      const res = await authApi.put(`/product/${product.id}`, {
        product_name: product.product_name,
        remark: product.remark,
      });

      setMessage(res.data.msg || "更新しました");
      setMessageType("success");
      setTimeout(() => setMessage(""), 3000);

      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? product : p))
      );

      setEditingProduct(null);
    } catch (error) {
      const errMsg = error.response?.data?.error || "更新に失敗しました";
      setMessage(errMsg);
      setMessageType("error");
      setTimeout(() => setMessage(""), 3000);
    }
  };
  

  // プロダクト削除
  const handleDeleteConfirmed = async () => {
    if (!deleteTarget) return;

    try {
      const res = await authApi.delete(`/product/${deleteTarget.id}`);

      setMessage(res.data.msg || "削除しました");
      setMessageType("success");
      setTimeout(() => setMessage(""), 3000);

      const newProducts = products.filter((p) => p.id !== deleteTarget.id);
      setProducts(newProducts);
      setNextPage(newProducts.length === 10);
      setDeleteTarget(null);
    } catch (error) {
      const errMsg = error.response?.data?.error || "削除に失敗しました";
      setMessage(errMsg);
      setMessageType("error");
      setTimeout(() => setMessage(""), 3000);
      setDeleteTarget(null);
    }
  };
  
  

  return (

    <div style={{ padding: "30px" }}>
        {message && (
      <div
        style={{
          backgroundColor: messageType === "success" ? "#d4edda" : "#f8d7da",
          color: messageType === "success" ? "#155724" : "#721c24",
          padding: "10px",
          borderRadius: "6px",
          marginBottom: "10px",
          transition: "opacity 0.3s ease",
        }}
      >
        {message}
      </div>
    )}
      <h1>プロダクト一覧</h1>

      <button onClick={() => setIsOpen(true)}>登録</button>

      <table
        border="1"
        cellPadding="10"
        style={{ borderCollapse: "collapse", width: "100%", marginTop: "10px" }}
      >
        <thead>
          <tr>
            <th>ロゴ</th>
            <th>プロダクト名</th>
            <th>詳細</th>
            <th>備考</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
  {loading ? (
    <tr>
      <td colSpan="5" style={{ textAlign: "center" }}>
        読み込み中...
      </td>
    </tr>
  ) : (
    products.map((product) => (
      <tr key={product.id}>
        <td>
          <div
            style={{
              width: "40px",
              height: "40px",
              background: "#ddd",
              textAlign: "center",
              lineHeight: "40px",
            }}
          >
            Logo
          </div>
        </td>
        <td>{product.product_name}</td>
        <td>
          <Link to={`/products/${product.id}/plan`}>
            <button>プラン</button>
          </Link>
          <Link to={`/contracts?product_id=${product.id}`}>
            <button>契約</button>
          </Link>
        </td>
        <td>{product.remark}</td>
        <td style={{ position: "relative" }}>
          <button
            onClick={() =>
              setOpenMenuId(openMenuId === product.id ? null : product.id)
            }
          >
            ⋮
          </button>
          {openMenuId === product.id && (
            <div style={{ zIndex: 1 }}>
              <button onClick={() => setEditingProduct(product)}>
                編集
              </button>
              <button
                onClick={() => setDeleteTarget(product)}
                style={{ color: "red" }}
              >
                削除
              </button>
            </div>
          )}
        </td>
      </tr>
    ))
  )}
</tbody>

      </table>

      <div style={{ marginTop: "10px" }}>
        <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
          前のページ
        </button>
        <span style={{ margin: "0 10px" }}>Page {page}</span>
        <button disabled={!NextPage} onClick={() => setPage((p) => p + 1)}>
          次のページ
        </button>
      </div>

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
  );
}

export default ProductsPage;
