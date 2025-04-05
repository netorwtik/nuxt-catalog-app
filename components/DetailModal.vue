<template>
  <div class="modal-overlay" v-if="isOpen" @click.self="close">
    <div class="modal-content">
      <button class="modal-close" @click="close">✕</button>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    isOpen: Boolean,
  });

  const emit = defineEmits(['close']);

  const close = () => {
    emit('close');
  };
</script>

<style lang="scss" scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .modal-content {
    background: white;
    border-radius: 8px;
    padding: 2rem;
    max-width: 90%;
    max-height: 90%;
    overflow-y: auto;
    position: relative;
  }

  .modal-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #666;

    &:hover {
      color: #333;
    }
  }
</style>
