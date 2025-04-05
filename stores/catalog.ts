
import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import type { Product, PaginationInfo, ViewMode } from "~/types/item";


export const useCatalogStore = defineStore("catalog", () => {

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


  const paginatedProducts = computed(() => {
    const start =
      (pagination.value.currentPage - 1) * pagination.value.itemsPerPage;
    const end = start + pagination.value.itemsPerPage;
    return filteredProducts.value.slice(start, end);
  });


  async function fetchProducts() {
    loading.value = true;
    error.value = null;
    
    try {

      const response = await axios.get('https://dummyjson.com/products');
      const data = response.data;
      
      if (!data || !data.products || !Array.isArray(data.products)) {
        throw new Error('Некорректные данные от API');
      }
      

      products.value = data.products.map((item: any) => ({
        id: item.id,
        name: item.title || 'Без названия',
        description: item.description || 'Описание отсутствует',
        price: typeof item.price === 'number' ? item.price : 0,
        category: item.category || 'Без категории',
        brand: item.brand || 'Без бренда',
        color: item.color || 'Не указан',
        dimensions: {
          width: item.width || 0,
          height: item.height || 0,
          depth: item.depth || 0
        },
        weight: item.weight || 0,
        stock: item.stock || 0,
        rating: typeof item.rating === 'number' ? item.rating : 0,
        image: item.thumbnail || '',
        features: item.features || []
      }));
      

      filteredProducts.value = [...products.value];
      

      pagination.value.totalItems = filteredProducts.value.length;
      pagination.value.totalPages = Math.ceil(filteredProducts.value.length / pagination.value.itemsPerPage);
    } catch (err) {
      console.error('Error fetching products:', err);
      error.value = err instanceof Error 
        ? `Ошибка при загрузке данных: ${err.message}` 
        : 'Произошла неизвестная ошибка при загрузке данных';
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
