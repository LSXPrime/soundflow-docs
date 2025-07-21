# SoundFlow Documentation Website

[![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/LSXPrime/soundflow-docs/deploy.yml?style=for-the-badge&logo=github)](https://github.com/LSXPrime/soundflow-docs/actions/workflows/deploy.yml)
[![GitHub Stars](https://img.shields.io/github/stars/LSXPrime/SoundFlow?style=for-the-badge&logo=github&label=Star%20the%20Library)](https://github.com/LSXPrime/SoundFlow)
[![View Docs](https://img.shields.io/badge/View%20Docs-blue?style=for-the-badge&logo=react)](https://lsxprime.github.io/soundflow-docs/)

Welcome to the repository for the official documentation and landing page of **SoundFlow**, a powerful and flexible .NET audio engine for cross-platform development. This website is built with **Vite** and **React** to provide a rich, interactive, and user-friendly experience for developers using SoundFlow.

This repository contains the source code for the documentation website itself, not the SoundFlow .NET library. For the SoundFlow library codebase, please visit the main [**SoundFlow GitHub Repository**](https://github.com/LSXPrime/SoundFlow).

## About This Website

This project serves as the central hub for all information related to SoundFlow. It's designed to:

*   **Introduce SoundFlow:** A polished, animated landing page showcases the key features and strengths of the engine.
*   **Get Started Quickly:** Follow step-by-step guides to install and set up SoundFlow in your .NET projects.
*   **Provide Comprehensive Docs:** Access multi-version API references, tutorials, and practical examples.
*   **Be a Joy to Use:** Offer a fast, searchable, and responsive interface with light and dark modes.

## Features

*   **Modern Tech Stack:** Built with Vite, React, and TypeScript for a fast and type-safe developer experience.
*   **Rich Content:** Documentation is written in MDX, allowing for interactive React components directly within Markdown.
*   **Jamstack Architecture:** Content is processed at build time into static JSON, ensuring lightning-fast page loads.
*   **Client-Side Search:** An instant, pre-indexed search powered by FlexSearch.
*   **Versioning:** Easily switch between different versions of the documentation.
*   **Interactive Components:** Features stylish code blocks with a "typewriter" effect and a highly versatile `Steps` component.
*   **Polished UI/UX:** Smooth animations and transitions powered by Framer Motion.
*   **Automated Deployments:** Deploys automatically to GitHub Pages on every push to the `main` branch.

## Running Locally

To run this documentation website locally, you'll need to have Node.js and npm installed. Follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/LSXPrime/soundflow-docs.git
    cd soundflow-docs
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```

    This will start the Vite development server. Open your browser and navigate to the address shown in your terminal (usually `http://localhost:5173/`) to view the website. Changes to both code and content in the `/content` directory will trigger a hot-reload.

## Contributing

We welcome contributions to improve the SoundFlow documentation! Here's how you can help:

*   **Report Library Issues:** If you find a bug or have a feature request for the **SoundFlow .NET library**, please [open an issue on the main repository](https://github.com/LSXPrime/SoundFlow/issues).
*   **Improve the Documentation:** For errors, typos, or unclear sections on *this website*, you can:
    *   **Edit Content Directly:** The documentation is located in the `content/` directory. You can edit the `.mdx` files and submit a pull request.
    *   **Fix a Bug:** Find a bug in the website's React components? Fork the repository, fix it, and open a pull request.

We appreciate your help in making the SoundFlow documentation better for everyone!

## Links

*   **Live Documentation Website:** [**https://lsxprime.github.io/soundflow-docs/**](https://lsxprime.github.io/soundflow-docs/)
*   **SoundFlow GitHub Repository (Main Library):** [**https://github.com/LSXPrime/SoundFlow**](https://github.com/LSXPrime/SoundFlow)