var myVar;

function myFunction() {
  myVar = setTimeout(showPage, 3000); // Modify the number to modify load time (700+ recommended)
  updateLoaderText(); // Call the function to update the loader text
}

function showPage() {
  document.getElementById("loader").style.display = "none";  
  document.getElementById("loadertext").style.display = "none";
  document.getElementById("loader-container").style.display = "none";
  document.getElementById("myDiv").style.display = "block";
}

function updateLoaderText() {
  const loaderText = document.getElementById("loadertext");
  if (loaderText) {
    const messages = ["Starting up the servers...", "Finding entertainment...", "Organizing and optimizing..."];
    let index = 0;
    setInterval(() => {
      loaderText.innerHTML = `<h3>${messages[index]}</h3>`;
      index = (index + 1) % messages.length;
    }, 1000); // Change message every second
  }
}
