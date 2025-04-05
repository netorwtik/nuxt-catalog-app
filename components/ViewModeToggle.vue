<template>
  <div class="view-mode-toggle">
    <button
      class="toggle-btn"
      :class="{ active: currentMode === 'grid' }"
      @click="setMode('grid')"
      aria-label="Показать в виде сетки">
      <span class="icon grid-icon">
        <svg viewBox="0 0 24 24" width="18" height="18">
          <rect x="3" y="3" width="7" height="7" fill="currentColor" />
          <rect x="14" y="3" width="7" height="7" fill="currentColor" />
          <rect x="3" y="14" width="7" height="7" fill="currentColor" />
          <rect x="14" y="14" width="7" height="7" fill="currentColor" />
        </svg>
      </span>
    </button>
    <button
      class="toggle-btn"
      :class="{ active: currentMode === 'list' }"
      @click="setMode('list')"
      aria-label="Показать списком">
      <span class="icon list-icon">
        <svg viewBox="0 0 24 24" width="18" height="18">
          <rect x="3" y="4" width="18" height="2" fill="currentColor" />
          <rect x="3" y="11" width="18" height="2" fill="currentColor" />
          <rect x="3" y="18" width="18" height="2" fill="currentColor" />
        </svg>
      </span>
    </button>
  </div>
</template>

<script setup>
  const { currentMode, setMode } = useViewMode();
</script>

<style lang="scss" scoped>
  .view-mode-toggle {
    display: flex;
    align-items: center;

    .toggle-btn {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 0.5rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 0.5rem;
      transition: all 0.2s;

      &:first-child {
        border-radius: 4px 0 0 4px;
        margin-left: 0;
      }

      &:last-child {
        border-radius: 0 4px 4px 0;
      }

      &.active {
        background: #3498db;
        border-color: #3498db;
        color: white;
      }

      &:not(.active):hover {
        background: #e9e9e9;
      }

      .icon {
        display: flex;
        align-items: center;
      }
    }
  }
</style>
