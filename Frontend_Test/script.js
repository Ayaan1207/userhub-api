document.getElementById("userForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();

  const responseBox = document.getElementById("response");
  responseBox.innerText = "Submitting...";

  try {
    const res = await fetch("http://localhost:3000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email })
    });

    const data = await res.json();

    if (res.ok) {
      responseBox.innerText = `✅ User added: ${data.name} (${data.email})`;
    } else {
      responseBox.innerText = `❌ Error: ${data.error || "Something went wrong"}`;
    }
  } catch (error) {
    responseBox.innerText = `❌ Network error: ${error.message}`;
  }

  document.getElementById("userForm").reset();
});
