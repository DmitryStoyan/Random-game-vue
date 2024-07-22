<script setup>
import { initialRouletteImg } from "../initialRouletteImg";
import { ref, onMounted, watch } from 'vue';

const props = defineProps({
  selectedGames: {
    type: Array,
    required: true,
    default: () => []
  }
});

const cells = 243;
let isStarted = ref(false);

function getItem() {
  if (props.selectedGames.length === 0) {
    return { name: "question", img: initialRouletteImg.question };
  }

  const randomIndex = Math.floor(Math.random() * props.selectedGames.length);
  const selectedGameName = props.selectedGames[randomIndex].toLowerCase().replace(/\s+(\d)/g, "$1");
  return {
    name: props.selectedGames[randomIndex],
    img: initialRouletteImg[selectedGameName],
  };
}

function generateItems() {
  const listElement = document.querySelector(".list");
  if (listElement) {
    listElement.innerHTML = "";
  }
  const scopeElement = document.querySelector(".scope");
  if (scopeElement) {
    scopeElement.innerHTML = "<ul class='list'></ul>";
  }
  const list = document.querySelector(".list");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // chopSound.pause();
          // chopSound.currentTime = 0;
          // chopSound.play();
        }
      });
    },
    {
      root: document.querySelector(".scope"),
      threshold: 0.9,
    }
  );

  for (let i = 0; i < cells; i++) {
    const item = getItem();
    const li = document.createElement("li");

    li.setAttribute("data-item", JSON.stringify(item));
    li.classList.add("list__item");
    li.innerHTML = `<img class='list__item-image' src='${item.img}' alt='${item.name}'>`;

    list.append(li);

    observer.observe(li);
  }
}

function start() {
  if (isStarted.value) {
    return;
  } else {
    isStarted.value = true;
  }

  generateItems();

  const list = document.querySelector(".list");

  setTimeout(() => {
    list.style.left = "50%";
    list.style.transform = "translate3d(-50%, 0, 0)";
  }, 0);

  list.addEventListener("transitionend", () => {
    isStarted.value = false;
    const items = list.querySelectorAll(".list__item");
    const centerItemIndex = Math.floor(items.length / 2);
    const centerItem = items[centerItemIndex];

    if (centerItem) {
      // winSound.play();
      const data = JSON.parse(centerItem.getAttribute("data-item"));
      console.log("Итоговый элемент:", data);
      centerItem.classList.add("active");
    }
  });
}

onMounted(() => {
  generateItems();
});

watch(() => props.selectedGames, generateItems, { deep: true });
</script>

<template>
  <div class="roulette">
    <div class="pointer"></div>
    <div class="app-roulette">
      <div class="scope">
        <ul class="list"></ul>
      </div>
    </div>
    <button @click="start">Крутить</button>
  </div>
</template>
<style>
.roulette {
  position: relative;
  margin: 15rem 0 0 0;
}

.active {
  opacity: 1 !important;
}

.pointer {
  background-image: url(@/images/pointer-theme-dark.png);
  background-position: center;
  background-size: cover;
  position: absolute;
  left: 50%;
  top: 0.5rem;
  transform: translate3d(-50%, -25px, 0);
  height: 4rem;
  width: 4rem;
  z-index: 2;
}

.pointer-theme-dark {
  background-image: url(@/images/pointer-theme-dark.png);
}

.pointer-theme-light {
  background-image: url(@/images/pointer.png);
}

.app-roulette {
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 0 auto;
  background: #1b1f24;
  border-radius: 10px;
  overflow: hidden;
}

.scope {
  overflow: hidden;
}

.list {
  position: relative;
  display: inline-flex;
  left: 0;
  min-height: 150px;
  transform: translate3d(0, 0, 0);
  list-style: none;
  transition: 15s cubic-bezier(0.21, 0.53, 0.29, 0.99);
}

.list__item {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 20rem;
  opacity: 0.5;
  transition: 0.3s ease;
}

.list__item:nth-child(2n) {
  background: rgba(0, 0, 0, 0.1);
}

.list__item-image {
  width: 80%;
  height: 80%;
  object-fit: contain;
  transition: 0.3s ease;
}

.btn-start {
  margin: 5rem 0 3rem 0;
}

@media (max-width: 1024px) {
  .roulette {
    margin: 30rem 0 0 0;
  }
}

@media (max-width: 768px) {
  .roulette {
    margin: 20rem 0 0 0;
  }
}

@media (max-width: 500px) {
  .roulette {
    margin: 30rem 0 0 0;
  }
}

@media screen and (max-width: 480px) {
  .app-roulette {
    position: relative;
    background: #1b1f24;
    border-radius: 10px;
  }
}
</style>
