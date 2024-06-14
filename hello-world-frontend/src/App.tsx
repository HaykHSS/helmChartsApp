import { useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGetText = () => {
    // fetch(`${import.meta.env.VITE_BACKEND_URL}`)
    fetch('http://backend-service.backend.svc.cluster.local')
      .then((res) => {
        setLoading(true);
        return res.json();
      })
      .then((res) => {
        console.log(res);

        setText(res);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  if (error) {
    return <p className="error general">{error}</p>;
  }
  if (loading) {
    return <p className="loading general">Loading...</p>;
  }

  return (
    <div className="wrapper">
      <button className="button" onClick={handleGetText}>
        Get Text
      </button>
      {text && <p className="text general">{text}</p>}
    </div>
  );
}

export default App;
