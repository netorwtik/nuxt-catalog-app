<template>
  <div class="items-per-page">
    <label for="items-per-page">Показывать по:</label>
    <select id="items-per-page" v-model="selectedValue" @change="updateItemsPerPage">
      <option v-for="option in options" :key="option" :value="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script setup>
  const options = [5, 10, 20, 50];
  const selectedValue = ref(10);
  const { setItemsPerPage } = usePagination();

  const updateItemsPerPage = () => {
    setItemsPerPage(selectedValue.value);
  };
</script>

<style lang="scss" scoped>
  .items-per-page {
    display: flex;
    align-items: center;
    font-size: 0.9rem;

    label {
      margin-right: 0.5rem;
      color: #666;
    }

    select {
      padding: 0.3rem 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      background-color: white;
      cursor: pointer;

      &:focus {
        outline: none;
        border-color: #3498db;
      }
    }
  }
</style>
