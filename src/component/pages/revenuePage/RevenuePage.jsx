import { Link } from "react-router-dom";

function RevenuePage() {

  return (
    <>
      RevenuePage
      <nav>
        <Link to={`/revenues/graph`}>グラフ表示</Link><br/>
      </nav>
    </>
  )
}

export default RevenuePage