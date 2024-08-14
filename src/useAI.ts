import { useState, useCallback } from 'react';

interface AIServiceConfig {
  apiKey: string;
  model?: string;
  options?: object;
  endpoint?: string; // Add this line to include endpoint in the configuration
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

const useAI = ({ service, config, endpoint, prompt }: UseAIOptions) => {
  const [response, setResponse] = useState<AIResponse>({ data: null, error: null, loading: false });

  const callAIService = useCallback(async () => {
    setResponse({ data: null, error: null, loading: true });

    const url = endpoint || serviceEndpoints[service](config);
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.apiKey}`,
    };

    const payload =
      service === 'openai'
        ? { model: config.model || 'text-davinci-003', prompt, ...config.options }
        : service === 'huggingface'
        ? { inputs: prompt, ...config.options }
        : service === 'cohere'
        ? { model: config.model || 'medium', prompt, ...config.options }
        : service === 'deepai'
        ? { text: prompt, ...config.options }
        : service === 'google-gemini'
        ? { prompt, ...config.options }
        : { prompt, ...config.options };

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`API call failed: ${res.statusText}`);
      }

      const result = await res.json();
      setResponse({ data: result, error: null, loading: false });
    } catch (error: any) {
      setResponse({ data: null, error: error.message, loading: false });
    }
  }, [service, config, endpoint, prompt]);

  return { response, callAIService };
};

export default useAI;
