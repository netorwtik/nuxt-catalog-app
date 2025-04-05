
import { computed } from "vue";
import { useCatalogStore } from "~/stores/catalog";

export const usePagination = () => {
  const store = useCatalogStore();
  
  const pagination = computed(() => store.pagination);

  const pageNumbers = computed(() => {
    const currentPage = pagination.value.currentPage;
    const totalPages = pagination.value.totalPages;
    const delta = 2;

    const pages: (number | string)[] = [];

    
    if (currentPage > 1) {
      pages.push(1);
      if (currentPage > delta + 1) {
        pages.push("...");
      }
    }

    
    const pagesStart = Math.max(2, currentPage - delta);
    const pagesEnd = Math.min(totalPages - 1, currentPage + delta);

    for (let i = pagesStart; i <= pagesEnd; i++) {
      pages.push(i);
    }

    
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

  const setItemsPerPage = (count: number) => {
    if (count > 0) {
      store.pagination.itemsPerPage = count;
      store.pagination.totalPages = Math.ceil(store.filteredProducts.length / count);
      
      
      if (store.pagination.currentPage > store.pagination.totalPages) {
        store.pagination.currentPage = store.pagination.totalPages;
      }
    }
  };
  
  return {
    pagination,
    pageNumbers,
    goToPage,
    nextPage,
    prevPage,
    setItemsPerPage
  };
};
