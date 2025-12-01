// Azuka
console.log("auth.js loaded ✅");

import { auth,
         createUserWithEmailAndPassword,
         signInWithEmailAndPassword } from "./firebase-init.js";

const loginForm   = document.getElementById("loginForm");
const signupForm  = document.getElementById("signupForm");
const showLogin   = document.getElementById("showLogin");
const showSignup  = document.getElementById("showSignup");
const authStatus  = document.getElementById("authStatus");

// --- toggle between forms ---
showLogin.addEventListener("click", () => {
  showLogin.classList.add("active");
  showSignup.classList.remove("active");
  loginForm.classList.remove("hidden");
  signupForm.classList.add("hidden");
  authStatus.textContent = "";
});

showSignup.addEventListener("click", () => {
  showSignup.classList.add("active");
  showLogin.classList.remove("active");
  signupForm.classList.remove("hidden");
  loginForm.classList.add("hidden");
  authStatus.textContent = "";
});

// --- login ---
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      authStatus.textContent = "Logged in! Redirecting...";
      // redirect to main app page
      setTimeout(() => {
        window.location.href = "SocialMediaYapp.html";
      }, 700);
    })
    .catch(err => {
      authStatus.textContent = "Login error: " + err.message;
    });
});

// Signup
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      authStatus.textContent = "Account created! Redirecting...";
      // after signup you can send them to index.html or back to login view
      setTimeout(() => {
        window.location.href = "SocialMediaYapp.html";
      }, 700);
    })
    .catch(err => {
      authStatus.textContent = "Signup error: " + err.message;
    });
});
