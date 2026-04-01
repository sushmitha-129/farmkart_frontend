import { useState } from "react";

function Address({ setPage }) {

  const [address, setAddress] = useState("");

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        // Convert to readable address using OpenStreetMap
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
        );
        const data = await res.json();

        setAddress(data.display_name);
      },
      () => {
        alert("Location access denied");
      }
    );
  };

  const handleNext = () => {
    if (!address) {
      alert("Enter address");
      return;
    }

    localStorage.setItem("address", address);
    setPage("payment");
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>📍 Delivery Address</h2>

      <textarea
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter address"
        style={{
          width: "300px",
          height: "80px",
          padding: "10px",
          borderRadius: "8px"
        }}
      />

      <br /><br />

      <button className="button" onClick={getLocation}>
        Use My Location 📍
      </button>

      <br /><br />

      <button className="button" onClick={handleNext}>
        Continue to Payment →
      </button>
    </div>
  );
}

export default Address;