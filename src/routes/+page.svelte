<main class="landing">
  <h1>Welcome to JaNOracle</h1>
  <p class="overview">
    JaNOracle is your creative oracle that answers your questions creatively with a GIF but also with an attitude. <br/>
    Whether you're feeling curious, impulsive, or indecisive — JaNOracle responds in English or German, and always with sass. <br/>
    Ja = Yes, No = Nein. I am JaNOracle, got it?
  </p>
  <a href="/login">
    <button>Enter the Oracle Chamber</button>
  </a>
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

  button {
    margin-top: 2rem;
    padding: 0.75rem 1.5rem;
    font-size: 1.1rem;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  button:hover {
    background-color: rgba(0, 0, 0, 0.9);
  }
</style>
