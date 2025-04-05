<template>
  <div class="pagination" v-if="pagination.totalPages > 1">
    <button class="pagination-btn prev" :disabled="pagination.currentPage === 1" @click="prevPage">
      &laquo;
    </button>

    <div v-for="(page, index) in pageNumbers" :key="index" class="pagination-item">
      <button
        v-if="typeof page === 'number'"
        class="pagination-btn"
        :class="{ active: page === pagination.currentPage }"
        @click="goToPage(page)">
        {{ page }}
      </button>
      <span v-else class="pagination-ellipsis">{{ page }}</span>
    </div>

    <button
      class="pagination-btn next"
      :disabled="pagination.currentPage === pagination.totalPages"
      @click="nextPage">
      &raquo;
    </button>
  </div>
</template>

<script setup lang="ts">
  import { usePagination } from '~/composables/usePagination';

  const { pagination, pageNumbers, goToPage, nextPage, prevPage } = usePagination();
</script>

<style lang="scss" scoped>
  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 2rem 0;

    .pagination-item {
      margin: 0 0.25rem;
    }

    .pagination-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 2.5rem;
      height: 2.5rem;
      padding: 0 0.5rem;
      border: 1px solid #ddd;
      background: white;
      border-radius: 4px;
      font-size: 0.875rem;
      cursor: pointer;
      transition: all 0.2s;

      &:hover:not(:disabled):not(.active) {
        background: #f5f5f5;
      }

      &.active {
        background: #3498db;
        border-color: #3498db;
        color: white;
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      &.prev,
      &.next {
        font-weight: bold;
      }
    }

    .pagination-ellipsis {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 2.5rem;
      height: 2.5rem;
      font-size: 0.875rem;
    }
  }
</style>
