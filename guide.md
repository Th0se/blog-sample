<!-- @format -->

# General

1. Use single quotes. If astrophobes are needed, use string literals.
2. When writing tsx, properties vital to an element's functionality goes first, followed by event handlers and then styles at last.
    ```.tsx
    <button type='button' onClick={() => alert(`It's clicking!`)} className='text-black'>Click</button>
    ```

# Environment variables.

## `.env`

These are values required in the `.env` file.

# Styles

1. `<main>` and every container inside `<main>` should be padded. A safe minimum is `0.5rem`, but `0.25` may be acceptable in some cases.
