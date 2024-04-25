const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

$("#search-icon").click(function() {
  $(".nav").toggleClass("search");
  $(".nav").toggleClass("no-search");
  $(".search-input").toggleClass("search-active");
});

$('.menu-toggle').click(function(){
   $(".nav").toggleClass("mobile-nav");
   $(this).toggleClass("is-active");
});

function getUserDataFromLocalStorage() {
  const storedUserData = JSON.parse(localStorage.getItem('userData'));
  if (storedUserData) {
      return storedUserData;
  } else {
      return null;
  }
}

function loginUser(event) {
  event.preventDefault(); // Prevent default form submission behavior
  
  const storedUserData = getUserDataFromLocalStorage();
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;

  // Check if username and password fields are empty
  if (username === "" || password === "") {
      Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Enter username and password."
      });
      return; // Return early if fields are empty
  }

  if (storedUserData && storedUserData.username === username && storedUserData.password === password) {
      // Login successful, display success message and redirect after a delay
      Swal.fire({
          title: "Login Successful!",
          icon: "success",
          timer: 2000, // Set a timer to automatically close the alert after 2 seconds
          showConfirmButton: false // Hide the "OK" button
      }).then(() => {
          // Redirect to todos page after the success message duration
          window.location.href = "todos.html";
      });
  } else {
      // Login unsuccessful, display error message
      Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Login Unsuccessful! Invalid username or password."
      });
  }
}





function saveUserDataToLocalStorage(userData) {
  localStorage.setItem('userData', JSON.stringify(userData));
}

function signupUser() {
  const username = document.getElementById('signupUsername').value;
  const password = document.getElementById('signupPassword').value;
  const email = document.getElementById('signupEmail').value;

  // Check if user already exists in local storage by username or email
  const storedUserData = getUserDataFromLocalStorage();
  if (storedUserData) {
    if (storedUserData.username === username) {
      Swal.fire({
        title: "Error",
        text: "Username already exists",
        icon: "error"
      });
      return; // Stop further execution
    }
    if (storedUserData.email === email) {
      Swal.fire({
        title: "Error",
        text: "Email already exists",
        icon: "error"
      });
      return; // Stop further execution
    }
  }

  const userData = {
    username,
    password,
    email
  };
  saveUserDataToLocalStorage(userData);

  // Show success message
  Swal.fire({
    title: "Successful! Registered",
    icon: "success",
    timer: 2000, // Set a timer to automatically close the alert after 2 seconds
    showConfirmButton: false // Hide the "OK" button
  }).then(() => {
    // Redirect to the index page (or any other page you want to redirect to after signing up)
    window.location.href = "index.html";
  });
}


