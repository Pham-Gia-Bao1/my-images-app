<template>
  <section class="explore-tags-container p-6 w-[80%] mx-auto">
    <!-- Subheader -->
    <h3 class="text-center text-2xl text-white font-bold">
      The dankest memes, or your money back!
    </h3>
    <!-- Header with Title and More Tags link -->
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-white font-bold">EXPLORE TAGS</h2>
      <a href="#" class="text-white font-bold">MORE TAGS +</a>
    </div>

    <!-- Scrollable Tags Grid for mobile with nowrap -->
    <div
      class="overflow-x-auto hide-scrollbar whitespace-nowrap flex justify-center"
    >
      <div class="inline-flex space-x-4 w-full flex justify-between">
        <div
          v-for="tag in tags"
          :key="tag.name"
          class="tag-card bg-gray-500 w-[120px] relative rounded-lg text-center"
        >
          <img
            :src="tag.image"
            alt="Tag image"
            class="h-full w-full object-cover mb-4 rounded-md"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'SubHeadingComponent',
  data() {
    return {
      tags: [
        {
          image: "../assets/images/baking.png",
        },
        {
          image: "../assets/images/products/a1.jpg",
        },
        {
          image: "../assets/images/products/a2.jpg",
        },
        {
          image: "../assets/images/products/a3.jpg",
        },
        {
          image: "../assets/images/products/a4.jpg",
        },
        {
          image: "../assets/images/products/a5.jpg",
        },
        {
          image: "../assets/images/products/a6.jpg",
        },
        {
          image: "../assets/images/products/a7.jpg",
        },
        {
          image: "../assets/images/products/a1.jpg",
        },
      ],
    };
  },
};
</script>

<style scoped>
/* Hide default scrollbar for WebKit browsers */
.hide-scrollbar::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

/* Scrollbar track */
.hide-scrollbar::-webkit-scrollbar-track {
  background: #1f1f2e;
  border-radius: 10px;
}

/* Scrollbar handle */
.hide-scrollbar::-webkit-scrollbar-thumb {
  background-color: #4a4a5a;
  border-radius: 10px;
  border: 3px solid #1f1f2e;
}

/* Customize scrollbar for Firefox */
.hide-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #4a4a5a #1f1f2e;
}
</style>
