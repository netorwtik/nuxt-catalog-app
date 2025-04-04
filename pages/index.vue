<!-- pages/index.vue -->
<template>
  <div class="container">
    <header class="app-header">
      <h1 class="app-title">Каталог товаров</h1>
      <p class="app-subtitle">Найдите электронику по вашему вкусу</p>
    </header>

    <main class="catalog-container">
      <SearchBar />
      <CatalogList />
    </main>
  </div>
</template>

<script setup lang="ts">
import SearchBar from "~/components/SearchBar.vue";
import CatalogList from "~/components/CatalogList.vue";
</script>

<style lang="scss" scoped>
.app-header {
  margin: 3rem 0 2rem;
  text-align: center;

  .app-title {
    font-size: 2.5rem;
    color: #2c3e50;
    margin-bottom: 0.5rem;
  }

  .app-subtitle {
    font-size: 1.1rem;
    color: #666;
  }
}

.catalog-container {
  margin-bottom: 3rem;
}
</style>
