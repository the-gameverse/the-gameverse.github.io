// Check if the user has closed the popup before
if (!localStorage.getItem('popupClosed')) {
    document.getElementById('whatsNewPopup').style.display = 'flex';
}

// Close the popup when the close button is clicked
document.getElementById('closePopup').addEventListener('click', function () {
    document.getElementById('whatsNewPopup').style.display = 'none';
    // Store that the user has closed the popup
    localStorage.setItem('popupClosed', 'true');
});