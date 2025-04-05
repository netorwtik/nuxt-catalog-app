
import { computed } from "vue";
import { useCatalogStore } from "~/stores/catalog";
import type { ViewMode } from "~/types/item";

export const useViewMode = () => {
  const store = useCatalogStore();

  const currentMode = computed(() => store.viewMode);

  const setMode = (mode: ViewMode) => {
    store.setViewMode(mode);
  };

  return {
    currentMode,
    setMode,
  };
};
