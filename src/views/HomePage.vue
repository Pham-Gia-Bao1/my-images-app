<template>
    <div class="header-box flex flex-col justify-center items-center">
      <!-- Use Navbar component here -->
      <Navbar />
      <!-- Use SubHeading component here -->
      <SubHeading />
    </div>
    <div class="body-box p-4 w-full bg-gray-900 flex flex-col justify-start items-center min-h-screen">
      <div class="w-[90%]">
        <div class="w-full flex justify-between items-center mb-4">
          <!-- New Post Button (Hidden on small screens) -->
          <label
            for="main_input"
            class="new-post-button"
          >
            <p v-if="loading">
              loading...
            </p>
            <p v-else>+ New post</p>
          </label>
          <h2 class="title">All Images</h2>
        </div>

        <!-- Project Cards Container -->
        <div class="cards-container">
          <div
            v-for="(image, index) in images"
            :key="index"
            class="image-card"
          >
            <img
              :src="image.url"
              class="image"
              :alt="'Project ' + (index + 1)"
            />
            <button
              @click="downloadImage(image.url)"
              class="download-button"
            >
              <i class="fa-solid fa-download"></i>
            </button>
          </div>

          <!-- Create New Project Card -->
          <input
            type="file"
            id="main_input"
            class="hidden"
            @change="handleFileUpload"
            multiple
          />
        </div>
      </div>
    </div>
  </template>

  <script>

  export default {
    name: 'HomePage',
    data() {
      return {
        images: [], // Array to store image file objects and URLs
        loading: false, // State for loading
      };
    },
    mounted() {
      // Fetch images when the component mounts
      this.fetchImages();
    },
    methods: {
      handleFileUpload(event) {
        const files = event.target.files;
        this.loading = true; // Start the loading spinner

        Array.from(files).forEach(file => {
          this.uploadToCloudinary(file);
        });
      },

      async uploadToCloudinary(file) {
        const uploadPreset = "ml_default"; // Replace with your Cloudinary upload preset
        const cloudinaryURL = `https://api.cloudinary.com/v1_1/dtwfpuc6b/image/upload`; // Replace with your Cloudinary cloud name

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", uploadPreset);
        formData.append("folder", "my_pictures");

        try {
          const response = await fetch(cloudinaryURL, {
            method: "POST",
            body: formData,
          });
          const data = await response.json();

          if (data.secure_url) {
            this.images.push({ url: data.secure_url });
          }
        } catch (error) {
          console.error("Error uploading image:", error);
        } finally {
          this.loading = false;
        }
      },

      async downloadImage(url) {
        try {
          const response = await fetch(url);
          const blob = await response.blob();
          const blobUrl = window.URL.createObjectURL(blob);

          const link = document.createElement("a");
          link.href = blobUrl;
          link.setAttribute("download", "downloaded_image.jpg");
          document.body.appendChild(link);
          link.click();

          document.body.removeChild(link);
          window.URL.revokeObjectURL(blobUrl);
        } catch (error) {
          console.error("Error downloading the image:", error);
        }
      },

      async fetchImages() {
        const cloudinaryURL = `https://server-realtime-node.onrender.com/api/images`;

        this.loading = true;

        try {
          const response = await fetch(cloudinaryURL);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          if (data.images && data.images.length > 0) {
            this.images = data.images;
          }
        } catch (error) {
          console.error("Error fetching images:", error);
        } finally {
          this.loading = false;
        }
      },
    },
  };
  </script>

  <style scoped>
  .header-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-image: url("../assets/images/backgroundHeader.png");
  }

  .body-box {
    padding: 16px;
    width: 100%;
    background-color: #1a202c; /* bg-gray-900 */
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    min-height: 100vh;
  }

  .content-container {
    width: 90%;
  }

  .new-post-button {
    background-color: #1abc9c; /* New post button color */
  color: white; /* Text color */
  padding: 8px 16px; /* Padding inside button */
  border: none; /* Remove border */
  border-radius: 4px; /* Rounded corners */
  cursor: pointer; /* Pointer cursor */
  margin-right: 10px; /* Space between buttons */
  width: 100px;
  }

  @media (min-width: 768px) {
    .new-post-button {
      display: flex; /* Show on medium screens and above */
    }
  }

  .title {
    font-size: 24px;
    font-weight: bold;
    color: white;
  }

  .cards-container {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  @media (min-width: 768px) {
    .cards-container {
      grid-template-columns: repeat(4, 1fr); /* md:grid-cols-4 */
    }
  }

  .image-card {
    display: flex;
    flex-direction: column;
    border: 2px solid;
    height: 288px; /* h-72 */
    background-color: white;
    border-radius: 8px; /* rounded-lg */
    position: relative;
  }

  .image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px; /* rounded-lg */
  }

  .download-button {
    position: absolute;
    top: 0;
    right: 0;
    padding: 8px;
    background-color: white;
    font-size: 0.875rem; /* text-sm */
    border: 2px solid #38a169; /* border-green-500 */
    color: #38a169; /* text-green-500 */
    font-weight: 600; /* font-semibold */
    border-radius: 6px; /* rounded-md */
    transition: background-color 0.3s, color 0.3s;
  }

  .download-button:hover {
    background-color: #38a169; /* hover:bg-green-500 */
    color: white; /* hover:text-white */
  }
  </style>
