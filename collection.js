// Function to display the current local time
function displayTime() {
    const now = new Date();
    const timeString = now.toLocaleString();
    document.getElementById("time").textContent = timeString;
}

// Call the function when the page loads
window.onload = displayTime;