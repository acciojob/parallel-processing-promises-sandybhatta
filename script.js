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
    const imagePromises = images.map((image) =>
      fetch(image.url).then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load image's URL: ${image.url}`);
        }
        return response.blob();
      })
    );

    const blobs = await Promise.all(imagePromises);
    updateUI(blobs);
  } catch (error) {
    console.log(error.message);
  }
}

function updateUI(blobs) {
  output.innerHTML = "";
  blobs.forEach((blob) => {
    const img = document.createElement("img");
    img.src = URL.createObjectURL(blob);
    output.appendChild(img);
  });
}