<template>
  <div class="search-bar">
    <div class="search-wrapper">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Поиск по названию, бренду, цвету..."
        class="search-input" />
      <button class="search-clear" v-if="searchQuery" @click="clearSearch">✕</button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useSearch } from '~/composables/useSearch';

  const { searchQuery } = useSearch();

  const clearSearch = () => {
    searchQuery.value = '';
  };
</script>

<style lang="scss" scoped>
  .search-bar {
    margin-bottom: 1.5rem;
    width: 100%;

    .search-wrapper {
      position: relative;
      width: 100%;

      .search-input {
        width: 100%;
        padding: 0.8rem 2.5rem 0.8rem 1rem;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 1rem;
        transition: border-color 0.2s;

        &:focus {
          outline: none;
          border-color: #3498db;
          box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
        }
      }

      .search-clear {
        position: absolute;
        right: 1rem;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        color: #999;
        cursor: pointer;
        font-size: 1rem;
        padding: 0;

        &:hover {
          color: #333;
        }
      }
    }
  }
</style>
