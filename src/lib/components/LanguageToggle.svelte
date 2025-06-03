<script lang="ts">
  import { language } from '$lib/stores';

  const toggleLanguage = () => {
    language.set($language === 'en' ? 'de' : 'en');
  };
</script>

<button on:click={toggleLanguage} class="lang-toggle">
  {#if $language === 'en'}EN | <strong>DE</strong>{:else}<strong>EN</strong> | DE{/if}
</button>

<style>
  .lang-toggle {
    background: none;
    border: none;
    font-size: 1rem;
    margin-bottom: 1rem;
    cursor: pointer;
    color: var(--text); /* Theme-aware text */
  }

  .lang-toggle strong {
    color: var(--text); /* Ensure bold also uses theme text */
  }

  .lang-toggle:hover {
    text-decoration: underline;
  }
</style>
