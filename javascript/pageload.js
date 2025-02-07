var myVar;

function myFunction() {
  myVar = setTimeout(showPage, 2000); // Modify the number to modify load time (700+ recommended)
  const loaderText = document.getElementById("loadertext");
  loaderText.innerHTML = `<h3>Loading... <i class="fa fa-loader-circle fa-spin"></i></h3>`;
}

function showPage() {
  document.getElementById("loader").style.display = "none";  
  document.getElementById("loadertext").style.display = "none";
  document.getElementById("loader-container").style.display = "none";
  document.getElementById("myDiv").style.display = "block";
}

