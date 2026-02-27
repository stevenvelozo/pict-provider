# Pict Provider

> Base class for data providers in the Pict MVC ecosystem

Manage application data, coordinate templates, and hook into the Pict application lifecycle. Providers handle the data side of Pict applications — loading, transforming, and saving state — while views handle rendering.

- **Lifecycle Hooks** -- Tap into initialization, data load, solve, render, and save phases with sync and async methods
- **Auto-Integration** -- Register with a Pict application and automatically participate in init, solve, and data load cycles
- **Template Management** -- Load default templates at construction time through the options object
- **Shared State** -- Access AppData and Bundle from any provider through the Fable dependency injection container

[Quick Start](README.md)
[Lifecycle](lifecycle.md)
[API Reference](api.md)
[GitHub](https://github.com/stevenvelozo/pict-provider)
