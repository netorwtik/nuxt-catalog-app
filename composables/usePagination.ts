// composables/usePagination.ts
import { computed } from "vue";
import { useCatalogStore } from "~/stores/catalog";

export const usePagination = () => {
  const store = useCatalogStore();

  const pagination = computed(() => store.pagination);

  const pageNumbers = computed(() => {
    const currentPage = pagination.value.currentPage;
    const totalPages = pagination.value.totalPages;
    const delta = 2; // Количество страниц до и после текущей

    const pages: (number | string)[] = [];

    // Начало
    if (currentPage > 1) {
      pages.push(1);
      if (currentPage > delta + 1) {
        pages.push("...");
      }
    }

    // Середина
    const pagesStart = Math.max(2, currentPage - delta);
    const pagesEnd = Math.min(totalPages - 1, currentPage + delta);

    for (let i = pagesStart; i <= pagesEnd; i++) {
      pages.push(i);
    }

    // Конец
    if (currentPage < totalPages) {
      if (currentPage < totalPages - delta) {
        pages.push("...");
      }
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  });

  const goToPage = (page: number) => {
    store.goToPage(page);
  };

  const nextPage = () => {
    if (pagination.value.currentPage < pagination.value.totalPages) {
      goToPage(pagination.value.currentPage + 1);
    }
  };

  const prevPage = () => {
    if (pagination.value.currentPage > 1) {
      goToPage(pagination.value.currentPage - 1);
    }
  };

  return {
    pagination,
    pageNumbers,
    goToPage,
    nextPage,
    prevPage,
  };
};
