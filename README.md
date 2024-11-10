# Universal Translator Extension for Directus

## Overview
The **Universal Translator Extension** for Directus allows you to translate strings, arrays, and JSON objects containing translation markers into a specified language. The extension reads translations from the `directus_translations` table and applies them throughout the provided input.

## Features
- Supports input of any type: string, array, or JSON object.
- Uses distinct `{$t:...}` markers for safer parsing and replacement.
- Automatically retrieves the user's language when the "Auto" option is selected.
- Recursively translates nested structures and complex payloads.

## Installation
1. Clone or download the extension into your Directus project under `extensions/operations`.
2. Build the extension:

    ```bash
    npm run build
    ```

3. Restart your Directus server to load the new extension.

## Usage
1. Go to the **Flows** section in Directus.
2. Add the **Universal Translator** operation to your flow.
3. Configure the operation:
   - **Input to Translate**: JSON input or a reference to a flow variable (e.g., `{{data_to_translate.data}}`).
   - **Language**: Select a specific language or choose "Auto" to use the current user's language.

## Input Format
Use the `{$t:...}` format for translation markers to ensure safe and accurate replacements.

### Example Input
```json
{
  "title": "{$t:welcome}",
  "content": "<p>{$t:internal_audit}</p>",
  "list": ["{$t:item1}", "Regular text", "{$t:item2}"]
}
```

### Example Output
```json
{
  "title": "Welcome",
  "content": "<p>Internal Audit</p>",
  "list": ["Item 1", "Regular text", "Item 2"]
}
```
### Configuration Options
- **Input to Translate**: The data to process, which can be a string, array, or JSON object.
- **Language**: Choose a language or select "Auto" to use the current user's language from directus_users.language.

### License
MIT License

### Contributions
Contributions and feedback are welcome! Please create an issue or submit a pull request for enhancements or bug fixes.