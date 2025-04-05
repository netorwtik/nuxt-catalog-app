<template>
  <button
    v-show="showButton"
    @click="scrollToTop"
    class="back-to-top"
    aria-label="Вернуться наверх">
    <svg viewBox="0 0 24 24" width="20" height="20">
      <path
        d="M12 2L6 8.6M12 2L18 8.6M12 22L12 2"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round" />
    </svg>
  </button>
</template>

<script setup>
  const showButton = ref(false);

  const checkScroll = () => {
    showButton.value = window.scrollY > 300;
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  onMounted(() => {
    window.addEventListener('scroll', checkScroll);
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', checkScroll);
  });
</script>

<style lang="scss" scoped>
  .back-to-top {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #3498db;
    color: white;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    transition: all 0.3s;
    z-index: 999;

    &:hover {
      background-color: #2980b9;
      transform: translateY(-3px);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    }
  }
</style>
