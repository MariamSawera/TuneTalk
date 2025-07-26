// src/components/Navbar.jsx
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="p-4 bg-black text-white flex justify-between">
      <h1 className="text-xl font-bold">Musix</h1>
      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/chat">Chat</Link>
      </div>
    </nav>
  );
}
