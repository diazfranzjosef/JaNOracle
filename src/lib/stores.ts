import { writable, derived } from 'svelte/store';

type LanguageKey = 'en' | 'de';
type AnswerKey = 'yes' | 'no' | 'maybe';

type Translations = {
  [lang in LanguageKey]: {
    ask: string;
    placeholder: string;
    getAnswer: string;
    logout: string;
    yes: string;
    no: string;
    maybe: string;
    thinking: string;
  };
};

const translations: Translations = {
  en: {
    ask: 'Ask JaNOracle',
    placeholder: "What's your question?",
    getAnswer: 'Get Answer',
    logout: "I'm done seeking wisdom",
    yes: 'Absolutely YES!',
    no: 'Definitely NO.',
    maybe: 'Hmm... MAYBE.',
    thinking: 'The oracle is thinking...'
  },
  de: {
    ask: 'Frage JaNOracle',
    placeholder: 'Was möchtest du wissen?',
    getAnswer: 'Antwort holen',
    logout: 'Ich habe genug Weisheit gefunden',
    yes: 'Aber natürlich, JA!',
    no: 'Ganz klar, NEIN.',
    maybe: 'Vielleicht... wer weiß?',
    thinking: 'Das Orakel denkt nach...'
  }
};

export const language = writable<LanguageKey>('en');
export const t = derived(language, ($lang) => translations[$lang]);

// Suggestions per language
type Suggestions = {
  [lang in LanguageKey]: string[];
};

const suggestions: Suggestions = {
  en: ['Should I eat that?', 'Is it my destiny?', 'Will I win the lottery?'],
  de: ['Soll ich das essen?', 'Ist es mein Schicksal?', 'Werde ich im Lotto gewinnen?']
};

export const suggestedQuestions = derived(language, ($lang) => suggestions[$lang]);

// Theme setup
export const theme = writable<'light' | 'dark'>('light');

if (typeof localStorage !== 'undefined') {
  const saved = localStorage.getItem('theme');
  if (saved === 'light' || saved === 'dark') {
    theme.set(saved);
    document.documentElement.setAttribute('data-theme', saved);
  }

  theme.subscribe((val) => {
    localStorage.setItem('theme', val);
    document.documentElement.setAttribute('data-theme', val);
  });
}
