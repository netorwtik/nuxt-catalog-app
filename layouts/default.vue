<!-- layouts/default.vue -->
<template>
  <div class="app-layout">
    <header class="app-header">
      <div class="container header-container">
        <NuxtLink to="/" class="logo">
          <span class="logo-text">TechCatalog</span>
        </NuxtLink>
      </div>
    </header>

    <main class="app-main">
      <slot />
    </main>

    <footer class="app-footer">
      <div class="container footer-container">
        <p>
          &copy; {{ new Date().getFullYear() }} TechCatalog. Все права защищены.
        </p>
      </div>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app-header {
  background-color: #2c3e50;
  color: white;
  padding: 1rem 0;

  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    text-decoration: none;
    color: white;

    .logo-text {
      font-size: 1.5rem;
      font-weight: 700;
    }
  }
}

.app-main {
  flex: 1;
}

.app-footer {
  background-color: #2c3e50;
  color: white;
  padding: 1.5rem 0;
  margin-top: 3rem;

  .footer-container {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  p {
    font-size: 0.875rem;
    opacity: 0.8;
  }
}
</style>
