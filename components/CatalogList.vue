<!-- components/CatalogList.vue -->
<template>
  <div class="catalog-list-container">
    <div class="catalog-header">
      <div class="catalog-results">
        <span v-if="store.loading">Загрузка товаров...</span>
        <span v-else-if="store.error">{{ store.error }}</span>
        <span v-else>
          Найдено: {{ store.filteredProducts.length }} товаров
        </span>
      </div>

      <ViewModeToggle />
    </div>

    <div
      v-if="!store.loading && !store.error"
      class="catalog-list"
      :class="{ 'list-view': store.viewMode === 'list' }"
    >
      <template v-if="store.paginatedProducts.length">
        <CatalogItem
          v-for="product in store.paginatedProducts"
          :key="product.id"
          :product="product"
          :viewMode="store.viewMode"
        />
      </template>

      <div v-else class="no-results">
        <p>Не найдено товаров, соответствующих вашему запросу.</p>
        <button @click="store.searchProducts('')" class="reset-search">
          Сбросить поиск
        </button>
      </div>
    </div>

    <Pagination v-if="!store.loading && store.paginatedProducts.length" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useCatalogStore } from "~/stores/catalog";
import ViewModeToggle from "./ViewModeToggle.vue";
import CatalogItem from "./CatalogItem.vue";
import Pagination from "./Pagination.vue";

const store = useCatalogStore();

// Загружаем товары при монтировании компонента
onMounted(async () => {
  await store.fetchProducts();
});
</script>

<style lang="scss" scoped>
.catalog-list-container {
  width: 100%;

  .catalog-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;

    .catalog-results {
      font-size: 0.9rem;
      color: #666;
    }
  }

  .catalog-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;

    &.list-view {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .no-results {
      grid-column: 1 / -1;
      text-align: center;
      padding: 3rem 0;
      color: #666;

      p {
        margin-bottom: 1rem;
      }

      .reset-search {
        background-color: #3498db;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.2s;

        &:hover {
          background-color: #2980b9;
        }
      }
    }
  }
}
</style>
