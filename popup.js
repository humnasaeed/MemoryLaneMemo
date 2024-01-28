// popup.js

// Array of pastel colors
var pastelColors = [
  '#FFD1DC', // Pastel Pink
  '#87CEFA', // Pastel Blue
  '#FFD700', // Pastel Yellow
  '#98FB98', // Pastel Green
  '#FFA07A', // Pastel Salmon
  '#DDA0DD', // Pastel Purple
  '#00FA9A'  // Pastel Mint
];

// Array of image filenames
var imageFilenames = [
  'image1.gif',
  'image2.gif',
  'image3.gif',
  'image4.gif',
  'image5.gif',
  'image6.gif',
  'image7.gif'
];

document.addEventListener('DOMContentLoaded', function() {
  // Get the body element
  var bodyElement = document.body;

  // Get a random index from the pastelColors array
  var randomColorIndex = Math.floor(Math.random() * pastelColors.length);

  // Set the background color of the body element
  bodyElement.style.backgroundColor = pastelColors[randomColorIndex];

  // Get the dancing character element
  var dancingCharacter = document.getElementById('dancing-character');

  // Get a random index for the image filenames array
  var randomImageIndex = Math.floor(Math.random() * imageFilenames.length);

  // Set the src attribute of the dancing character element
  dancingCharacter.src = imageFilenames[randomImageIndex];
});

function setPopupTiming() {
  // Add your timing logic here if needed
  // For example, you can set a timeout to change the background color and image after a certain time
  // setTimeout(changeColorsAndImage, 5000); // Change colors and image after 5 seconds
}

// Function to change the background color and image
function changeColorsAndImage() {
  var bodyElement = document.body;
  var dancingCharacter = document.getElementById('dancing-character');

  // Get a random index from the pastelColors array
  var randomColorIndex = Math.floor(Math.random() * pastelColors.length);

  // Set the background color of the body element
  bodyElement.style.backgroundColor = pastelColors[randomColorIndex];

  // Get a random index for the image filenames array
  var randomImageIndex = Math.floor(Math.random() * imageFilenames.length);

  // Set the src attribute of the dancing character element
  dancingCharacter.src = imageFilenames[randomImageIndex];
}
