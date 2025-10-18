import { useParams } from "react-router-dom";

function PlanPage() {
  const { productId } = useParams();

  return (
    <>
      <h1>PlanPage</h1>
      <p>プロダクト ID: {productId}</p>
    </>
  )
}

export default PlanPage