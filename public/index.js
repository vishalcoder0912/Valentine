let uploadedImageBase64 = null;

const imageInput = document.getElementById("imageUpload");

imageInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = (event) => {
    uploadedImageBase64 = event.target.result;
  };

  reader.readAsDataURL(file);
});

function goToValentine() {

  const yourName = document.getElementById("yourName").value.trim();
  const baeName = document.getElementById("baeName").value.trim();

  if (!yourName || !baeName) {
    alert("Enter both names.");
    return;
  }

  if (!uploadedImageBase64) {
    alert("Please upload an image and wait 1 second.");
    return;
  }

  try {
    sessionStorage.setItem("from", yourName);
    sessionStorage.setItem("to", baeName);
    sessionStorage.setItem("image", uploadedImageBase64);
  } catch (err) {
    alert("Image too large. Please upload a smaller image.");
    return;
  }

  window.location.href = "valentine.html";
}
