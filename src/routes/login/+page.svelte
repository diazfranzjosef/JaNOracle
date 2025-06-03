<script lang="ts">
  import { goto } from '$app/navigation';

  let username = '';
  let password = '';
  let error = '';

  const handleLogin = () => {
    if (username === 'user' && password === '1234') {
      localStorage.setItem('loggedIn', 'true');
      goto('/app');
    } else {
      error = 'Invalid credentials. Try again.';
    }
  };
</script>

<main class="landing">
  <h1>Log in to JaNOracle</h1>

  <input
    type="text"
    placeholder="Username"
    bind:value={username}
  />
  <input
    type="password"
    placeholder="Password"
    bind:value={password}
    on:keydown={(e) => e.key === 'Enter' && handleLogin()}
  />
  <button on:click={handleLogin}>Log In</button>

  {#if error}
    <p class="error">{error}</p>
  {/if}
</main>

<style>
  .landing {
    background: url('https://www.transparenttextures.com/patterns/stardust.png'),
                radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
    background-size: auto, cover;
    animation: starsMove 60s linear infinite;
    min-height: 100vh;
    padding: 4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    text-shadow: 0 0 6px rgba(0, 0, 0, 0.6);
    text-align: center;
  }

  @keyframes starsMove {
    from {
      background-position: 0 0, center;
    }
    to {
      background-position: 1000px 1000px, center;
    }
  }

  input {
    margin: 0.5rem 0;
    padding: 0.75rem;
    width: 250px;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    font-size: 1rem;
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
  }

  input::placeholder {
    color: #ccc;
  }

  button {
    margin-top: 1rem;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
  }

  button:hover {
    background-color: rgba(0, 0, 0, 0.9);
  }

  .error {
    margin-top: 1rem;
    color: #ff6b6b;
  }
</style>
