import { useSearchParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";


function ContractsPage() {
  const [searchParams] = useSearchParams();
  const clientId = searchParams.get("client_id") ? Number(searchParams.get("client_id")) : null;
  const productId = searchParams.get("product_id") ? Number(searchParams.get("product_id")) : null;

  useEffect(() => {
    // 将来はここでAPIからデータを取得する
    // fetch("/api/contracts")
    //   .then(res => res.json())
    //   .then(data => setContracts(data));
  }, []);

  const allContracts = [
    { id: 1, clientId: 1, productId: 1, name: "契約プランA", revenue: 1000 },
    { id: 2, clientId: 1, productId: 2, name: "契約プランB", revenue: 2000 },
    { id: 3, clientId: 2, productId: 1, name: "契約プランC", revenue: 1500 },
    { id: 4, clientId: 3, productId: 3, name: "契約プランD", revenue: 3000 },
    { id: 5, clientId: 3, productId: 4, name: "契約プランE", revenue: 4000 },
    { id: 6, clientId: 1, productId: 2, name: "契約プランF", revenue: 5000 },
  ];

  // クエリに応じたフィルタリング
  let contracts = allContracts;
  if (clientId) {
    contracts = contracts.filter(c => c.clientId === clientId);
  }
  if (productId) {
    contracts = contracts.filter(c => c.productId === productId);
  }

  const LIMIT = 3;
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(contracts.length / LIMIT);

  const displayedContracts = contracts.slice((page - 1) * LIMIT, page * LIMIT);

  return (
    <div style={{ padding: "30px" }}>
      <h1>ContractPage</h1>
      {clientId && <p>選択されたクライアントID: {clientId}</p>}
      {productId && <p>選択されたプロダクトID: {productId}</p>}

      <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>契約ID</th>
            <th>契約名</th>
            <th>売上</th>
          </tr>
        </thead>
        <tbody>
          {displayedContracts.map(contract => (
            <tr key={contract.id}>
              <td>{contract.id}</td>
              <td>{contract.name}</td>
              <td>
                <Link to={`/contracts/${contract.id}/revenue`}>
                  <button>{contract.revenue}</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "20px" }}>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>前のページ</button>
        <span style={{ margin: "0 10px" }}>{page} / {totalPages}</span>
        <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>次のページ</button>
      </div>
    </div>
  );
}

export default ContractsPage;
