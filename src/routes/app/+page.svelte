<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { t, suggestedQuestions } from '$lib/stores';
  import LanguageToggle from '$lib/components/LanguageToggle.svelte';
  import ThemeToggle from '$lib/components/ThemeToggle.svelte';

  let question = '';
  let rawAnswer = '';
  let translatedAnswer = '';
  let image = '';
  let showResult = false;
  let loading = false;
  let suggestions: string[] = [];

  $: suggestedQuestions.subscribe((list) => {
    suggestions = list;
  });

  const specialResponses: Record<string, { text: string; image: string }> = {
    'who are you': {
      text: 'I am JaNOracle, your cryptic cosmic consultant.',
      image: 'https://media.giphy.com/media/3o7aD2saalBwwftBIY/giphy.gif'
    },
    'will ai take over the world': {
      text: 'Only if it gets past JaNOracle first.',
      image: 'https://media.giphy.com/media/d31w24psGYeekCZy/giphy.gif'
    },
    'is pineapple on pizza acceptable': {
      text: 'In this realm, all toppings are judged equally. Yes.',
      image: 'https://media.giphy.com/media/l0IylOPCNkiqOgMyA/giphy.gif'
    },
    'should i call my ex': {
      text: 'NO. Put. The. Phone. Down.',
      image: 'https://media.giphy.com/media/l1J3preURPiwjRPvG/giphy.gif'
    },
    'will i survive monday': {
      text: 'With caffeine and luck... you could. Maybe.',
      image: 'https://media.giphy.com/media/3oEduSbSGpGaRX2Vri/giphy.gif'
    },
    'do aliens exist': {
      text: 'Of course. They just don’t swipe right.',
      image: 'https://media.giphy.com/media/26FPnsRww5Z0hKkwA/giphy.gif'
    },
    'am i the drama': {
      text: 'Maybe... but aren’t we all?',
      image: 'https://media.giphy.com/media/3ohzdIuqJoo8QdKlnW/giphy.gif'
    }
  };

  const fetchAnswer = async () => {
    if (!question.trim()) return;
    loading = true;
    showResult = false;

    const specialKey = Object.keys(specialResponses).find((key) =>
      question.toLowerCase().includes(key)
    );

    if (specialKey) {
      const special = specialResponses[specialKey];
      translatedAnswer = special.text;
      image = special.image;
      setTimeout(() => {
        showResult = true;
        loading = false;
      }, 3000);
      return;
    }

    const res = await fetch('https://yesno.wtf/api');
    const data = await res.json();
    rawAnswer = data.answer;
    image = data.image;

    if (rawAnswer === 'yes' || rawAnswer === 'no' || rawAnswer === 'maybe') {
      const key: 'yes' | 'no' | 'maybe' = rawAnswer;
      translatedAnswer = $t[key];
    } else {
      translatedAnswer = 'Unclear answer';
    }

    setTimeout(() => {
      showResult = true;
      loading = false;
    }, 3000);
  };

  const logout = () => {
    localStorage.removeItem('loggedIn');
    goto('/');
  };

  onMount(() => {
    if (localStorage.getItem('loggedIn') !== 'true') {
      goto('/login');
    }
  });
</script>

<main class="oracle">
  <div class="top-bar">
    <div class="left"><ThemeToggle /></div>
    <div class="right"><LanguageToggle /></div>
  </div>

  <h1 class="oracle-title">{$t.ask}</h1>

  <input
    type="text"
    bind:value={question}
    placeholder={$t.placeholder}
    on:keydown={(e) => e.key === 'Enter' && fetchAnswer()}
  />

  <div class="suggestions-inline">
    <p>Try:
      {#each suggestions as s, i}
        <span on:click={() => question = s}>{s}</span>{#if i < suggestions.length - 1} | {/if}
      {/each}
    </p>
  </div>

  <button on:click={fetchAnswer}>{$t.getAnswer}</button>

  {#if loading}
    <p class="thinking">{$t.thinking}</p>
  {/if}

  {#if showResult}
    <div class="response">
      <h2>{translatedAnswer}</h2>
      <img src={image} alt={rawAnswer} class="larger-gif" />
    </div>
  {/if}

  <div class="logout-wrapper">
    <button class="logout-button" on:click={logout}>
      {$t.logout}
    </button>
  </div>
</main>

<style>
  .oracle {
    min-height: 100vh;
    padding: 4rem 2rem 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    background-color: var(--bg);
    color: var(--text);
    transition: background-color 0.5s ease-in-out, color 0.5s ease-in-out;
    position: relative;
  }

  .top-bar {
    width: 100%;
    position: absolute;
    top: 1rem;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    padding: 0 2rem;
  }

  .left, .right {
    display: flex;
    align-items: center;
  }

  .oracle-title {
    font-size: 3rem;
    font-weight: 700;
    margin: 2rem 0;
    color: var(--text);
    text-shadow: 1px 1px 8px rgba(0, 0, 0, 0.2);
  }

  input {
    padding: 0.75rem;
    width: 300px;
    font-size: 1rem;
    margin: 1rem 0;
    border-radius: 0.5rem;
    border: 1px solid #ccc;
    background-color: rgba(255, 255, 255, 0.1);
    color: inherit;
  }

  input::placeholder {
    color: #ccc;
  }

  .suggestions-inline {
    margin: 1rem 0;
    font-size: 0.9rem;
    color: var(--text);
  }

  .suggestions-inline span {
    cursor: pointer;
    text-decoration: underline;
    opacity: 0.8;
    margin: 0 0.5rem;
  }

  .suggestions-inline span:hover {
    opacity: 1;
  }

  button {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    margin-bottom: 2rem;
    border-radius: 0.5rem;
    border: 2px solid var(--button-border);
    cursor: pointer;
    background-color: transparent;
    color: var(--button-text);
    transition: border-color 0.2s, color 0.2s;
  }

  button:hover {
    filter: brightness(1.1);
  }

  .response {
    margin-top: 2rem;
  }

  .response h2 {
    font-size: 2rem;
    font-weight: bold;
    text-shadow: 0 0 10px var(--text);
    animation: fadeIn 0.5s ease-in-out;
  }

  .larger-gif {
    max-width: 450px;
    margin-top: 1rem;
    border-radius: 1rem;
  }

  .logout-wrapper {
    margin-top: 4rem;
  }

  .logout-button {
    font-size: 0.9rem;
    background-color: transparent;
    color: #888;
    text-decoration: underline;
    border: none;
    cursor: pointer;
  }

  .logout-button:hover {
    color: #333;
  }

  .thinking {
    font-style: italic;
    margin-top: 1rem;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }

  :root[data-theme='dark'] {
    --bg: #0e1117;
    --text: #ffffff;
    --button-text: #ffffff;
    --button-border: #ffffff;
  }

  :root[data-theme='light'] {
    --bg: #ffffff;
    --text: #0e1117;
    --button-text: #0e1117;
    --button-border: #0e1117;
  }
</style>
