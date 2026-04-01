import axios from "axios";

function Payment({ setPage }) {

  const user = JSON.parse(localStorage.getItem("user"));
  const address = localStorage.getItem("address");

  const handlePayment = async () => {

    // Fake payment delay (looks real)
    alert("Processing payment...");

    setTimeout(async () => {

      alert("Payment Successful 💳");

      await axios.post("http://localhost:5000/api/orders", {
        userId: user._id,
        address: address
      });

      alert("Order placed successfully 🎉");

      setPage("orders");

    }, 2000);
  };

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h2>💳 Payment Gateway</h2>

      <div style={{
        border: "1px solid #ddd",
        padding: "20px",
        borderRadius: "10px",
        display: "inline-block",
        background: "#f9f7ff"
      }}>
        <h3>FarmKart 💜</h3>
        <p><b>Deliver to:</b></p>
        <p>{address}</p>

        <br />

        <p>Select Payment Method:</p>

        <button className="button">UPI</button>
        <button className="button">Card</button>
        <button className="button">Net Banking</button>

        <br /><br />

        <button className="button" onClick={handlePayment}>
          Pay Now 💜
        </button>
      </div>
    </div>
  );
}

export default Payment;