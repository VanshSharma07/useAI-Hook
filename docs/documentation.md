# Documentation for `useAI` Hook

The `useAI` hook is a powerful tool for integrating various AI services into your React applications. This document provides usage instructions, code examples, and integration details for the hook.

## Features

- **Multi-Service Support**: Integrate with AI services like OpenAI, Hugging Face, Cohere, DeepAI, Google Gemini, and custom endpoints.
- **Flexible Configuration**: Configure API keys, models, and endpoints easily.
- **TypeScript Compatibility**: Includes TypeScript definitions for type safety.
- **Simple API**: Manage requests, handle responses, and manage loading states with ease.

  ## Parameters

- **service**: The AI service to use. Options include:
  - `'openai'` for OpenAI API
  - `'huggingface'` for Hugging Face models
  - `'cohere'` for Cohere API
  - `'deepai'` for DeepAI API
  - `'google-gemini'` for Google Gemini API
  - `'custom'` for custom endpoints
  - `'provider'` for custom providers

- **config**: Configuration object for the AI service:
  - **apiKey**: Your API key for the AI service.
  - **model** (optional): The specific model to use (e.g., `'text-davinci-003'` for OpenAI).
  - **options** (optional): Additional options for the API request.
  - **endpoint**: (optional, for custom services) Custom endpoint to override the default.

- **prompt**: The input text or prompt to send to the AI service.

- **customProvider**: (optional, for custom providers) Function to handle API calls for custom providers.

## Returns

- **response**: Object containing the result of the API call:
  - **data**: The response data from the AI service.
  - **error**: Any error message if the request fails.
  - **loading**: Boolean indicating if the request is in progress.

- **callAIService**: Function to trigger the API call with the current configuration.

## Contributing

We welcome contributions to enhance the functionality and support more AI services. Please follow the contributing guidelines in the `CONTRIBUTE.md` file.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Installation

Install the `useAI` hook via npm or yarn:

```bash
npm install useai-hook
# or
yarn add useai-hook

# useAI Hook Documentation

## Overview

The `useAI` hook allows you to interact with various AI models. You need to specify the service, configure it with necessary credentials, and provide a prompt or input. The hook returns an object with the current response, error, and loading state, and a function to trigger the API call.

## Basic Usage

### JavaScript

```javascript
import React, { useState } from 'react';
import useAI from 'useai-hook';

const AIComponent = () => {
  const [prompt, setPrompt] = useState('');
  const { response, callAIService } = useAI({
    service: 'openai',
    config: {
      apiKey: 'your-openai-api-key',
      model: 'text-davinci-003',
    },
    prompt: 'What is the meaning of life?',
  });

  const handleSubmit = () => {
    callAIService();
  };
  return (
    <div>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt"
      />
      <button onClick={handleSubmit}>Submit</button>
      {response.loading && <p>Loading...</p>}
      {response.error && <p>Error: {response.error}</p>}
      {response.data && <p>AI Response: {JSON.stringify(response.data)}</p>}
    </div>
  );
};


export default AIComponent;

## TypeScript Example

```typescript
import React, { useState } from 'react';
import useAI from 'useai-hook';

const AIComponent: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const { response, callAIService } = useAI({
    service: 'openai',
    config: {
      apiKey: 'your-openai-api-key',
      model: 'text-davinci-003',
    },
    prompt: 'What is the meaning of life?',
  });

  const handleSubmit = () => {
    callAIService();
  };

  return (
    <div>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt"
      />
      <button onClick={handleSubmit}>Submit</button>
      {response.loading && <p>Loading...</p>}
      {response.error && <p>Error: {response.error}</p>}
      {response.data && <p>AI Response: {JSON.stringify(response.data)}</p>}
    </div>
  );
};

export default AIComponent;



## Using a Custom AI Service

To use a custom AI service, provide a custom provider function:

### JavaScript

```javascript
import React, { useState } from 'react';
import useAI from 'useai-hook';

const CustomAIComponent = () => {
  const [prompt, setPrompt] = useState('');
  const { response, callAIService } = useAI({
    service: 'custom',
    config: {
      apiKey: 'your-custom-api-key',
    },
    endpoint: 'https://your-custom-ai-service.com/api/analyze',
    prompt: 'Analyze the following text for sentiment.',
    customProvider: async (config, prompt, endpoint) => {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${config.apiKey}`,
        },
        body: JSON.stringify({ prompt }),
      });
      if (!response.ok) throw new Error(`API call failed: ${response.statusText}`);
      return response.json();
    },
  });

  const handleSubmit = () => {
    callAIService();
  };

  return (
    <div>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt"
      />
      <button onClick={handleSubmit}>Submit</button>
      {response.loading && <p>Loading...</p>}
      {response.error && <p>Error: {response.error}</p>}
      {response.data && <p>AI Response: {JSON.stringify(response.data)}</p>}
    </div>
  );
};

export default CustomAIComponent;






