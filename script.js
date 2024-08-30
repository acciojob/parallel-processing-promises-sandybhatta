//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];
btn.addEventListener("click", () => {
  fetchingImages();
});

async function fetchingImages() {
  try {
    // Create an array of promises to fetch each image
    const imagePromises = images.map((image) =>
      fetch(image.url).then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load image's URL: ${image.url}`);
        }
        return image.url; // Return the URL directly if the response is OK
      })
    );

    // Use Promise.all to wait for all images to be fetched
    const urls = await Promise.all(imagePromises);

    // Update the UI with the fetched images
    updateUI(urls);
  } catch (error) {
    console.error(error.message);
  }
}

function updateUI(urls) {
  // Clear the output div
  output.innerHTML = "";

  urls.forEach((url) => {
    const img = document.createElement("img");
    img.src = url; // Set the src attribute to the image URL
    output.appendChild(img); // Append the image to the output div
  });
}