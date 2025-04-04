// stores/catalog.ts
import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import type { Product, PaginationInfo, ViewMode } from "~/types/item";
import type { ApiResponse } from "~/types/api";

export const useCatalogStore = defineStore("catalog", () => {
  // Состояние
  const products = ref<Product[]>([]);
  const filteredProducts = ref<Product[]>([]);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);
  const searchQuery = ref<string>("");
  const viewMode = ref<ViewMode>("grid");
  const pagination = ref<PaginationInfo>({
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 10,
    totalItems: 0,
  });
  const selectedProduct = ref<Product | null>(null);

  // Геттеры
  const paginatedProducts = computed(() => {
    const start =
      (pagination.value.currentPage - 1) * pagination.value.itemsPerPage;
    const end = start + pagination.value.itemsPerPage;
    return filteredProducts.value.slice(start, end);
  });

  // Действия
  async function fetchProducts() {
    loading.value = true;
    error.value = null;

    try {
      // Используем API для получения электронных товаров
      // API Products: https://dummyjson.com/products
      const response = await axios.get("https://dummyjson.com/products");
      const data = response.data;

      // Преобразуем данные в наш формат Product
      products.value = data.products.map((item: any) => ({
        id: item.id,
        name: item.title,
        description: item.description,
        price: item.price,
        category: item.category,
        brand: item.brand,
        color: item.color || "Не указан",
        dimensions: {
          width: item.width || 0,
          height: item.height || 0,
          depth: item.depth || 0,
        },
        weight: item.weight || 0,
        stock: item.stock,
        rating: item.rating,
        image: item.thumbnail,
        features: item.features || [],
      }));

      // Обновляем отфильтрованные продукты
      filteredProducts.value = [...products.value];

      // Обновляем пагинацию
      pagination.value.totalItems = filteredProducts.value.length;
      pagination.value.totalPages = Math.ceil(
        filteredProducts.value.length / pagination.value.itemsPerPage
      );
    } catch (err) {
      error.value = "Ошибка при загрузке данных";
      console.error("Error fetching products:", err);
    } finally {
      loading.value = false;
    }
  }

  function searchProducts(query: string) {
    searchQuery.value = query;

    if (!query.trim()) {
      filteredProducts.value = [...products.value];
    } else {
      const lowerQuery = query.toLowerCase();

      filteredProducts.value = products.value.filter((product) => {
        return (
          product.name.toLowerCase().includes(lowerQuery) ||
          product.description.toLowerCase().includes(lowerQuery) ||
          product.category.toLowerCase().includes(lowerQuery) ||
          product.brand.toLowerCase().includes(lowerQuery) ||
          product.color.toLowerCase().includes(lowerQuery) ||
          product.price.toString().includes(lowerQuery) ||
          product.features.some((feature) =>
            feature.toLowerCase().includes(lowerQuery)
          )
        );
      });
    }

    // Сбрасываем на первую страницу при поиске
    pagination.value.currentPage = 1;
    pagination.value.totalItems = filteredProducts.value.length;
    pagination.value.totalPages = Math.ceil(
      filteredProducts.value.length / pagination.value.itemsPerPage
    );
  }

  function setViewMode(mode: ViewMode) {
    viewMode.value = mode;
  }

  function goToPage(page: number) {
    if (page > 0 && page <= pagination.value.totalPages) {
      pagination.value.currentPage = page;
    }
  }

  function selectProduct(product: Product) {
    selectedProduct.value = product;
  }

  function clearSelectedProduct() {
    selectedProduct.value = null;
  }

  return {
    products,
    filteredProducts,
    paginatedProducts,
    loading,
    error,
    searchQuery,
    viewMode,
    pagination,
    selectedProduct,
    fetchProducts,
    searchProducts,
    setViewMode,
    goToPage,
    selectProduct,
    clearSelectedProduct,
  };
});
