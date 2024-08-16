import { useState, useCallback, useEffect } from 'react';

interface AIServiceConfig {
  apiKey: string;
  model?: string;
  options?: object;
  endpoint?: string;
}

interface UseAIOptions {
  service: 'openai' | 'huggingface' | 'cohere' | 'deepai' | 'google-gemini' | 'custom';
  config: AIServiceConfig;
  endpoint?: string;
  prompt: string;
}

interface AIResponse {
  data: any;
  error: string | null;
  loading: boolean;
}

const serviceEndpoints: { [key: string]: (config: AIServiceConfig) => string } = {
  openai: () => 'https://api.openai.com/v1/completions',
  huggingface: ({ model }) => `https://api-inference.huggingface.co/models/${model}`,
  cohere: () => 'https://api.cohere.ai/generate',
  deepai: () => 'https://api.deepai.org/api/text-generator',
  'google-gemini': () => 'https://bard.google.com/api/gemini/query',
  custom: ({ endpoint }) => endpoint || '',
};

// Debounce Hook to prevent too many requests being made in a short time
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const useAI = ({ service, config, endpoint, prompt }: UseAIOptions) => {
  const [response, setResponse] = useState<AIResponse>({ data: null, error: null, loading: false });
  const debouncedPrompt = useDebounce(prompt, 500); // Adjust the delay as needed

  const callAIService = useCallback(async () => {
    const controller = new AbortController();
    const signal = controller.signal;
    setResponse({ data: null, error: null, loading: true });

    const url = endpoint || serviceEndpoints[service](config);
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.apiKey}`,
    };

    const payload =
      service === 'openai'
        ? { model: config.model || 'text-davinci-003', prompt: debouncedPrompt, ...config.options }
        : service === 'huggingface'
        ? { inputs: debouncedPrompt, ...config.options }
        : service === 'cohere'
        ? { model: config.model || 'medium', prompt: debouncedPrompt, ...config.options }
        : service === 'deepai'
        ? { text: debouncedPrompt, ...config.options }
        : service === 'google-gemini'
        ? { prompt: debouncedPrompt, ...config.options }
        : { prompt: debouncedPrompt, ...config.options };

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
        signal,
      });

      if (!res.ok) {
        throw new Error(`API call failed: ${res.statusText}`);
      }

      const result = await res.json();
      setResponse({ data: result, error: null, loading: false });
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        setResponse({ data: null, error: error.message, loading: false });
      }
    }

    return () => controller.abort();
  }, [service, config, endpoint, debouncedPrompt]);

  useEffect(() => {
    if (debouncedPrompt) {
      callAIService();
    }
  }, [debouncedPrompt, callAIService]);

  return { response, callAIService };
};

export default useAI;
