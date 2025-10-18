import { useParams } from "react-router-dom";

function ContractRevenuePage() {
  const { contractId } = useParams();

  return (
    <div style={{ padding: "30px" }}>
      <h1>ContractRevenuePage</h1>
      <p>契約ID: {contractId}</p>
      <p>ここに契約の詳細や売上情報を表示できます</p>
    </div>
  )
}

export default ContractRevenuePage;
