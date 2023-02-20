const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");

registerForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(registerForm);
  const registerPayload = Object.fromEntries(data);

  await fetch("http://localhost:8080/api/session/register", {
    method: "POST",
    body: JSON.stringify(registerPayload),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(() => {
      window.location.href = "http://localhost:8080/profile";
      registerForm.reset();
    })
    .catch((err) => console.log(err));
});

loginForm?.addEventListener("submit", async(event) => {
  event.preventDefault()
  const data = new FormData(loginForm)
  const loginPayload = Object.fromEntries(data)

  await fetch("http://localhost:8080/api/session/login", {
    method: "POST",
    body: JSON.stringify(loginPayload),
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then(() => {
    window.location.href = "http://localhost:8080/profile";
    registerForm.reset();
  })
  .catch((err) => console.log(err));
})