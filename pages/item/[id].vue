<template>
  <div class="container product-detail-container">
    <div class="back-link">
      <NuxtLink to="/"> &larr; Вернуться к каталогу </NuxtLink>
    </div>

    <div v-if="loading">Загрузка информации о товаре...</div>

    <div v-else-if="error" class="error-message">
      {{ error }}
    </div>

    <div v-else-if="product" class="product-detail">
      <div class="product-image">
        <img :src="product.image" :alt="product.name" />
      </div>

      <div class="product-info">
        <h1 class="product-title">{{ product.name }}</h1>

        <div class="product-meta">
          <span class="product-brand">{{ product.brand }}</span>
          <span class="product-category">{{ product.category }}</span>
        </div>

        <div class="product-rating">
          <div class="stars" :style="{ '--rating': product.rating }"></div>
          <span class="rating-text">{{ product.rating.toFixed(1) }} / 5</span>
        </div>

        <p class="product-description">{{ product.description }}</p>

        <div class="product-specs">
          <h3>Характеристики</h3>

          <div class="spec-group">
            <div class="spec-item">
              <span class="spec-label">Цвет:</span>
              <span class="spec-value">{{ product.color }}</span>
            </div>

            <div v-if="product.dimensions" class="spec-item">
              <span class="spec-label">Размеры:</span>
              <span class="spec-value">
                {{ product.dimensions.width }}x{{ product.dimensions.height }}x{{
                  product.dimensions.depth
                }}
                см
              </span>
            </div>

            <div class="spec-item">
              <span class="spec-label">Вес:</span>
              <span class="spec-value">{{ product.weight }} кг</span>
            </div>

            <div class="spec-item">
              <span class="spec-label">В наличии:</span>
              <span class="spec-value">{{ product.stock }} шт.</span>
            </div>
          </div>
        </div>

        <div class="product-features" v-if="product.features && product.features.length">
          <h3>Особенности</h3>
          <ul>
            <li v-for="(feature, index) in product.features" :key="index">
              {{ feature }}
            </li>
          </ul>
        </div>

        <div class="product-price-actions">
          <div class="product-price">{{ formatPrice(product.price) }}</div>

          <button class="add-to-cart-btn">Добавить в корзину</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  // Используем автоимпорты Nuxt 3 - не нужно явно импортировать
  // В Nuxt 3 большинство компонентов автоматически импортируются

  const route = useRoute();
  const store = useCatalogStore();

  const product = ref(null);
  const loading = ref(true);
  const error = ref(null);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
    }).format(price);
  };

  onMounted(async () => {
    const id = Number(route.params.id);

    if (isNaN(id)) {
      error.value = 'Неверный идентификатор товара';
      loading.value = false;
      return;
    }

    // Если у нас еще нет данных, загружаем их
    if (store.products.length === 0) {
      await store.fetchProducts();
    }

    const foundProduct = store.products.find((p) => p.id === id);

    if (foundProduct) {
      product.value = foundProduct;
      store.selectProduct(foundProduct);
    } else {
      error.value = 'Товар не найден';
    }

    loading.value = false;
  });
</script>

<style lang="scss" scoped>
  .product-detail-container {
    padding: 2rem 0;

    .back-link {
      margin-bottom: 2rem;

      a {
        color: #3498db;
        text-decoration: none;
        font-weight: 500;

        &:hover {
          text-decoration: underline;
        }
      }
    }

    .error-message {
      padding: 2rem;
      text-align: center;
      background-color: #f8d7da;
      color: #721c24;
      border-radius: 8px;
      margin: 2rem 0;
    }

    .product-detail {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
      }

      .product-image {
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

        img {
          width: 100%;
          height: auto;
          display: block;
        }
      }

      .product-info {
        .product-title {
          font-size: 2rem;
          margin-bottom: 0.5rem;
          color: #2c3e50;
        }

        .product-meta {
          margin-bottom: 1rem;
          display: flex;
          align-items: center;

          .product-brand {
            font-weight: 600;
            color: #333;
          }

          .product-category {
            margin-left: 1rem;
            color: #666;

            &:before {
              content: '•';
              margin-right: 0.5rem;
            }
          }
        }

        .product-rating {
          display: flex;
          align-items: center;
          margin-bottom: 1.5rem;

          .stars {
            position: relative;
            display: inline-block;
            width: 100px;
            height: 20px;

            &:before {
              content: '★★★★★';
              letter-spacing: 3px;
              background: linear-gradient(90deg, gold var(--rating, 0%), #ddd var(--rating, 0%));
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              font-size: 20px;
            }
          }

          .rating-text {
            margin-left: 0.75rem;
            color: #666;
          }
        }

        .product-description {
          font-size: 1rem;
          line-height: 1.6;
          color: #333;
          margin-bottom: 2rem;
        }

        h3 {
          font-size: 1.25rem;
          margin-bottom: 1rem;
          color: #2c3e50;
        }

        .product-specs {
          margin-bottom: 2rem;

          .spec-group {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;

            @media (max-width: 480px) {
              grid-template-columns: 1fr;
            }

            .spec-item {
              display: flex;
              font-size: 0.95rem;

              .spec-label {
                font-weight: 600;
                color: #333;
                width: 40%;
              }

              .spec-value {
                color: #666;
              }
            }
          }
        }

        .product-features {
          margin-bottom: 2rem;

          ul {
            list-style-position: inside;
            padding-left: 0;

            li {
              margin-bottom: 0.5rem;
              color: #333;
            }
          }
        }

        .product-price-actions {
          display: flex;
          align-items: center;
          margin-top: 2rem;

          .product-price {
            font-size: 1.75rem;
            font-weight: 700;
            color: #2c3e50;
            margin-right: 2rem;
          }

          .add-to-cart-btn {
            background-color: #e74c3c;
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 4px;
            font-weight: 600;
            cursor: pointer;
            transition: background-color 0.2s;

            &:hover {
              background-color: #c0392b;
            }
          }
        }
      }
    }
  }
</style>
