// Function to start the game and navigate to the main game page
function startGame() {
    window.location.href = "index_main.html";
  }
  
  // Function to navigate to the instructions page
  function showInstructions() {
    window.location.href = "instructions.html";
  }
  
  // Add event listener for the start button
  document.getElementById("start-button").addEventListener("click", startGame);
  
  // Add event listener for the instructions button
  document.getElementById("instructions-button").addEventListener("click", showInstructions);
  