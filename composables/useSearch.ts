// composables/useSearch.ts
import { ref, watch, onBeforeUnmount } from "vue";
import { useCatalogStore } from "~/stores/catalog";

export const useSearch = () => {
  const searchQuery = ref("");
  const debouncedQuery = ref("");
  const store = useCatalogStore();

  // Используем debounce для поиска, чтобы не вызывать поиск при каждом нажатии клавиши
  watch(searchQuery, (newValue) => {
    const timer = setTimeout(() => {
      debouncedQuery.value = newValue;
      store.searchProducts(newValue);
    }, 300);

    onBeforeUnmount(() => {
      clearTimeout(timer);
    });
  });

  return {
    searchQuery,
    debouncedQuery,
  };
};
