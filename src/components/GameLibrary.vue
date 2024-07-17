<script setup>
import HeaderMenu from './HeaderMenu.vue'
import GamesLibraryItems from './GamesLibraryItems.vue'
import { initialGames } from '@/initialGames';
import { ref, computed } from 'vue';

const selectedGames = ref([]);
const sortBy = ref('');
const searchQuery = ref('');

const collator = new Intl.Collator('ru');

function toggleGameSelection(gameName) {
  const index = selectedGames.value.indexOf(gameName)
  if (index === -1) {
    selectedGames.value.push(gameName)
  } else {
    selectedGames.value.splice(index, 1)
  }
}

function onChangeSelect(event) {
  sortBy.value = event.target.value;
}

const filteredAndSortedGames = computed(() => {
  let games = [...initialGames]
  if (searchQuery.value) {
    games = games.filter(game => game.name.toLowerCase().includes(searchQuery.value.toLowerCase()))
  }
  if (sortBy.value === 'selected-game') {
    games = games.filter(game => selectedGames.value.includes(game.name))
  } else if (sortBy.value === 'by-name') {
    games = games.sort((a, b) => collator.compare(a.name, b.name))
  }

  return games
})
</script>

<template>
  <div>
    <HeaderMenu />
    <div class="search__wrapper">
      <input class="input-game-search" type="text" v-model="searchQuery" placeholder="Найти игру" />
      <select @change="onChangeSelect" class="game-sorting__select" name="game-sorting">
        <option class="game-sorting__item" value="" disabled selected hidden>
          Сортировать по
        </option>
        <option class="game-sorting__item" value="selected-game">
          Выбранные
        </option>
        <option class="game-sorting__item" value="by-name">По названию</option>
      </select>
    </div>
    <GamesLibraryItems :games="filteredAndSortedGames" :selectedGames="selectedGames"
      @toggle-game-selection="toggleGameSelection" />
  </div>

</template>

<style scoped>
.search__wrapper {
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 2rem;
}

.input-game-search {
  width: 100%;
  outline: none;
  padding: 0 30px;
  line-height: 5rem;
  border-radius: 1rem;
  border: 2px solid azure;
  color: azure;
  font-size: 2rem;
  background: transparent;
  /* margin: 10rem 0 0 0; */
  box-sizing: border-box;
}

.input-game-search::placeholder {
  transition: opacity 0.3s ease;
}

.input-game-search:focus::placeholder {
  opacity: 0;
}

.game-sorting__select {
  border: none;
  /* appearance: none; */
  padding: 0 3rem 0 1.5rem;
  /* width: 100%; */
  color: white;
  background-color: #67aeff;
  font-size: 2rem;
  /* margin: 10rem 0 0 0; */
  border-radius: 10px;
}

@media (max-width: 1024px) {
  .search__wrapper {
    grid-template-columns: 4fr 1fr;
  }

  .input-game-search {
    line-height: 4rem;
  }

  .game-sorting__select {
    font-size: 1rem;
  }
}

@media (max-width: 768px) {
  .input-game-search {
    line-height: 3rem;
    font-size: 1.4rem;
    padding: 0 20px;
  }
}

@media (max-width: 500px) {
  .game-sorting__select {
    padding: 0 1rem;
  }
}

@media (max-width: 375px) {
  .search__wrapper {
    grid-template-columns: 1fr;
  }

  .input-game-search {
    line-height: 4rem;
    font-size: 1.4rem;
    padding: 0 20px;
  }

  .game-sorting__select {
    height: 4rem;
    font-size: 2rem;
    margin: 0;
  }
}
</style>
