# Documentation for `useAI` Hook

The `useAI` hook is a powerful tool for integrating various AI services into your React applications. This document provides usage instructions, code examples, and integration details for the hook.

## Features

- **Multi-Service Support**: Integrate with AI services like OpenAI, Hugging Face, Cohere, DeepAI, Google Gemini, and custom endpoints.
- **Flexible Configuration**: Configure API keys, models, and endpoints easily.
- **TypeScript Compatibility**: Includes TypeScript definitions for type safety.
- **Simple API**: Manage requests, handle responses, and manage loading states with ease.

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



