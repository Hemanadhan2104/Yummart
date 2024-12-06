document.addEventListener("DOMContentLoaded", function () {
  const registerForm = document.getElementById("registerForm");
  const loginForm = document.getElementById("loginForm");
  const logoutBtn = document.getElementById("logoutBtn");

  if (registerForm) {
    registerForm.addEventListener("submit", handleRegistration);
  }

  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin);
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", handleLogout);
  }

  function handleRegistration(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const plainPassword = document.getElementById("password").value;
    const email = document.getElementById("email").value;

    if (!username || !plainPassword || !email) {
      alert("Please fill in all fields.");
      return;
    }

    let storedUserData = JSON.parse(localStorage.getItem("userData")) || [];
    const existingUser = storedUserData.find(
      (user) => user.username === username
    );

    if (existingUser) {
      alert("Username already exists. Please choose a different one.");
      return;
    }

    const userId = generateUniqueId();
    const hashedPassword = CryptoJS.SHA256(plainPassword).toString(
      CryptoJS.enc.Base64
    );

    const userData = {
      userId: userId,
      username: username,
      password: hashedPassword,
      email: email,
    };

    storedUserData.push(userData);
    localStorage.setItem("userData", JSON.stringify(storedUserData));

    const alertMessage =
      "Registration successful! You can now <a href='login.html'>login</a>. Your unique ID is: " +
      userId;
    showAlert(alertMessage);
    registerForm.reset();
  }

  function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const plainPassword = document.getElementById("password").value;
    let storedUserData = JSON.parse(localStorage.getItem("userData")) || [];
    const userData = storedUserData.find((user) => user.username === username);

    if (userData) {
      const hashedPassword = CryptoJS.SHA256(plainPassword).toString(
        CryptoJS.enc.Base64
      );
      if (userData.password === hashedPassword) {
        alert("Login successful!");
        localStorage.setItem("userId", userData.userId);
        localStorage.setItem("loggedInUser", JSON.stringify(userData));
        window.location.href = "index.html";
      } else {
        alert("Invalid username or password. Please try again.");
      }
    } else {
      alert("User not found. Please register first.");
    }
    loginForm.reset();
  }

  function handleLogout() {
    localStorage.removeItem("userId");
    localStorage.removeItem("loggedInUser");
    alert("Logout successful!");
    window.location.href = "index.html";
  }

  function showAlert(message) {
    const alertContainer = document.createElement("div");
    alertContainer.classList.add("alert", "alert-success");
    alertContainer.innerHTML = message;
    document.body.appendChild(alertContainer);
  }

  function generateUniqueId() {
    return "_" + Math.random().toString(36).substr(2, 9);
  }
});
