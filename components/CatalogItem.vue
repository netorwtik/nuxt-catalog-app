<template>
  <div class="catalog-item" :class="{ 'list-view': viewMode === 'list' }" @click="selectProduct">
    <div class="catalog-item-image">
      <img :src="product.image" :alt="product.name" />
    </div>

    <div class="catalog-item-content">
      <h3 class="item-title">{{ product.name }}</h3>

      <div class="item-brand-category">
        <span class="item-brand">{{ product.brand }}</span>
        <span class="item-category">{{ product.category }}</span>
      </div>

      <p v-if="viewMode === 'list'" class="item-description">
        {{ shortDescription }}
      </p>

      <div class="item-details">
        <div class="item-price">{{ formatPrice(product.price) }}</div>

        <div class="item-rating">
          <div class="stars" :style="{ '--rating': product.rating }"></div>
          <span class="rating-text">{{ product.rating.toFixed(1) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    product: {
      type: Object,
      required: true,
    },
    viewMode: {
      type: String,
      default: 'grid',
      validator: (value) => ['grid', 'list'].includes(value),
    },
  });

  const store = useCatalogStore();

  const shortDescription = computed(() => {
    return props.product.description.length > 100
      ? props.product.description.substring(0, 100) + '...'
      : props.product.description;
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const selectProduct = () => {
    store.selectProduct(props.product);
    navigateTo(`/item/${props.product.id}`);
  };
</script>

<style lang="scss" scoped>
  .catalog-item {
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s, box-shadow 0.2s;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    height: 100%;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }

    &.list-view {
      flex-direction: row;
      align-items: center;

      .catalog-item-image {
        width: 200px;
        height: 150px;
        flex-shrink: 0;
      }

      .catalog-item-content {
        padding: 1.5rem;
        flex-grow: 1;
      }
    }

    .catalog-item-image {
      height: 200px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s;
      }

      &:hover img {
        transform: scale(1.05);
      }
    }

    .catalog-item-content {
      padding: 1rem;
      display: flex;
      flex-direction: column;
      flex-grow: 1;

      .item-title {
        margin: 0 0 0.5rem;
        font-size: 1.1rem;
        font-weight: 600;
      }

      .item-brand-category {
        display: flex;
        align-items: center;
        margin-bottom: 0.75rem;
        font-size: 0.85rem;

        .item-brand {
          font-weight: 500;
          color: #333;
        }

        .item-category {
          color: #666;
          margin-left: 0.5rem;

          &:before {
            content: '•';
            margin-right: 0.5rem;
          }
        }
      }

      .item-description {
        margin-bottom: 1rem;
        color: #666;
        font-size: 0.9rem;
        line-height: 1.4;
      }

      .item-details {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: auto;

        .item-price {
          font-weight: 700;
          font-size: 1.2rem;
          color: #2c3e50;
        }

        .item-rating {
          display: flex;
          align-items: center;

          .stars {
            position: relative;
            display: inline-block;
            width: 80px;
            height: 16px;

            &:before {
              content: '★★★★★';
              letter-spacing: 3px;
              background: linear-gradient(90deg, gold var(--rating, 0%), #ddd var(--rating, 0%));
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              font-size: 16px;
            }
          }

          .rating-text {
            margin-left: 0.5rem;
            font-size: 0.85rem;
            color: #666;
          }
        }
      }
    }
  }
</style>
