import { useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGetText = () => {
    fetch("http://localhost:3001")
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
  if (text) {
    return <p className="text general">{text}</p>;
  }

  return (
    <button className="button" onClick={handleGetText}>
      Get Text
    </button>
  );
}

export default App;
