<script lang="ts">
  import { theme } from '$lib/stores';

  const toggleTheme = () => {
    theme.set($theme === 'light' ? 'dark' : 'light');
  };
</script>

<button on:click={toggleTheme} class="theme-toggle">
  🌓 {$theme === 'light' ? 'Dark' : 'Light'} Mode
</button>

<style>
  .theme-toggle {
    background: none;
    border: none;
    font-size: 1rem;
    margin-bottom: 1rem;
    cursor: pointer;
    color: var(--text);
  }
</style>
