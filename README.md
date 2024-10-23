# Figma Comments Exporter

This Node.js script exports Figma comments to a CSV file, including the comment text and direct links to each comment.

## Features

- Extracts all comments from a specified Figma file
- Generates direct links to each comment
- Exports data in CSV format with the following columns:
  - Comment: The comment text
  - Link: Direct link to the comment in Figma
  - Created At: Comment creation timestamp
  - Author: Username of the comment author
- Automatically creates a `dist` folder for output

## Prerequisites

- Node.js (v12 or higher recommended)
- Figma access token
- Figma file key

## Installation

1. Clone or download this repository
2. Install dependencies:
```bash
yarn
```

## Setup

1. Create a `.env` file in the root directory
2. Add your Figma credentials to the `.env` file:
```
FIGMA_ACCESS_TOKEN=your_access_token_here
FIGMA_FILE_KEY=your_file_key_here
```

### How to get credentials

- **Figma Access Token**:
  1. Log in to Figma
  2. Go to Settings -> Account Settings
  3. Scroll to Access Tokens
  4. Click "Generate new token"

- **Figma File Key**:
  1. Open your Figma file
  2. Copy the key from the URL: figma.com/file/**key**/...

## Usage

Run the script:
```bash
yarn start

or

node index.js
```

The CSV file will be generated in the `dist` folder as `figma-comments.csv`.

## Dependencies

- axios: For making HTTP requests to Figma API
- csv-writer: For generating CSV files
- dotenv: For loading environment variables

## Output

The script will create a CSV file with the following structure:
```csv
Comment,Link,Created At,Author
"Comment text","https://figma.com/...","2024/01/01 12:00:00","username"
```

## Error Handling

The script includes basic error handling for:
- Missing environment variables
- Failed API requests
- File system operations

## Contributing

Feel free to open issues or submit pull requests if you have suggestions for improvements.
