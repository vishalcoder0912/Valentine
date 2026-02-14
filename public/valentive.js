window.onload = () => {

  const from = sessionStorage.getItem("from");
  const to = sessionStorage.getItem("to");
  const img = sessionStorage.getItem("image");

  if (!from || !to) {
    alert("No data found. Go back and fill again.");
    window.location.href = "index.html";
    return;
  }

  document.getElementById("proposalText").innerText =
    `Will you be my valentine, ${to}? 💖`;

  document.getElementById("fromText").innerText =
    `From ${from} 💕`;

  if (img) {
    document.getElementById("valentineImage").src = img;
  }
};

function celebrate() {
  alert("She said YES! 💖🎉");
}
