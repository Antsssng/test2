import { useState } from "react";
import { Link } from "react-router-dom";

function ClientPage() {
  const [limit, setLimit] = useState(10);
  const [sort, setSort] = useState("recent");
  const [openMenuId, setOpenMenuId] = useState(null); // どの行のメニューを開いてるか

  const clients = [
    { id: 1, logo: "https://via.placeholder.com/40", name: "クライアントA", count: 3, note: "重要クライアント" },
    { id: 2, logo: "https://via.placeholder.com/40", name: "クライアントB", count: 1, note: "新規" },
    { id: 3, logo: "https://via.placeholder.com/40", name: "クライアントC", count: 5, note: "長期契約" },
  ];

  const sortedClients = [...clients].sort((a, b) => {
    if (sort === "name") return a.name.localeCompare(b.name);
    return b.id - a.id;
  });

  const handleMenuToggle = (id) => {
    setOpenMenuId(openMenuId === id ? null : id); // 開いてたら閉じる
  };

  const handleDelete = (id) => {
    alert(`${id} を削除します！`);
    // 実際はここでAPI呼び出しや状態更新を行う
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>クライアント一覧</h1>
      <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>LOGO</th>
            <th onClick={() => setSort("name")} style={{ cursor: "pointer" }}>
              クライアント {sort === "name" && "⬇"}
            </th>
            <th>契約</th>
            <th>契約数</th>
            <th>備考欄</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {sortedClients.map((client) => (
            <tr key={client.id}>
              <td><img src={client.logo} alt="logo" width="40" /></td>
              <td>{client.name}</td>
              <td>
                <Link to={`/contracts?client_id=${client.id}&limit=${limit}`}>
                  <button>詳細</button>
                </Link>
              </td>
              <td>{client.count} </td>
              <td>{client.note}</td>
              <td style={{ position: "relative" }}>
  <button onClick={() => handleMenuToggle(client.id)}>⋮</button>
  {openMenuId === client.id && (
    <button onClick={() => handleDelete(client.id)} className="delete-btn">
      削除
    </button>
  )}
</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ClientPage;
