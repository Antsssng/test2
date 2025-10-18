function Dialog({ title, children, onClose }) {
    return (
      <div style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        background: "rgba(0,0,0,0.3)", 
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
        <div style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "8px",
          width: "300px",   
        }}>
          <h2>{title}</h2>
          {children}
          <div style={{ marginTop: "10px", textAlign: "right" }}>
            <button onClick={onClose}>キャンセル</button>
          </div>
        </div>
      </div>
    );
  }
  
  export default Dialog;
  