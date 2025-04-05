<template>
  <header class="header">
    <div class="container">
      <NuxtLink to="/" class="logo">Tech Catalog</NuxtLink>
    </div>
  </header>
</template>

<style lang="scss" scoped>
  .header {
    background-color: #2c3e50;
    padding: 1rem 0;

    .container {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo {
      color: white;
      font-size: 1.5rem;
      font-weight: bold;
      text-decoration: none;
    }
  }
</style>
