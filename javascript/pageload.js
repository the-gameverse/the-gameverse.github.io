var myVar;

//const loaderText = document.getElementById("loadertext");
//loaderText.innerHTML = `<h3>Loading... <i class="fa-solid fa-circle-notch fa-spin"></i></h3>`;

function myFunction() {
  myVar = setTimeout(showPage, 700); // Modify the number to modify load time (700+ recommended)

}

function showPage() {
  document.getElementById("loader").style.display = "none";  
  document.getElementById("loadertext").style.display = "none";
  document.getElementById("loader-container").style.display = "none";
  document.getElementById("myDiv").style.display = "block";
}

