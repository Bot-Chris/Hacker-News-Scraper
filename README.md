
# Hacker News Scraper

This project is a Node.js script that fetches the top stories from Hacker News and saves them to a CSV file. It uses the Hacker News API to get the latest stories and Playwright for web scraping. The script can be customized to fetch a specified number of top stories and save them to a specified CSV file.

## Features

- Fetches top stories from Hacker News.
- Saves story details (title, URL, author, score, comments) to a CSV file.
- Allows customization of the number of stories and output file name through command-line arguments.
- Includes unit tests using Mocha and Chai.
- Mocks API responses using Nock for reliable testing.

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/hacker-news-scraper.git
   cd hacker-news-scraper
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

## Usage

### Running the Script

To run the script, use the following command:

```bash
node index.js
```

By default, the script fetches the top 10 stories and saves them to `hackernewsTopTen.csv`. You can customize these options using command-line arguments:

- **Number of stories**: Use the `-n` or `--number` option to specify the number of top stories to fetch.
- **Output file**: Use the `-o` or `--output` option to specify the name of the output CSV file.

Example:

```bash
node index.js --number 15 --output top15Articles.csv
```

### Command-Line Options

- `-n, --number <number>`: Number of top articles to fetch (default: 10).
- `-o, --output <file>`: Output CSV file (default: `hackernewsTopTen.csv`).

## Testing

Unit tests are provided to ensure the script functions correctly. The tests use Mocha as the test framework, Chai for assertions, and Nock to mock API responses.

### Running Tests

To run the tests, use the following command:

```bash
npm test
```

## Project Structure

- `index.js`: Main script file that fetches top stories from Hacker News and writes them to a CSV file.
- `test.mjs`: Test file containing unit tests for the script.
- `package.json`: Project metadata and dependencies.

## Dependencies

- [axios](https://github.com/axios/axios): Promise-based HTTP client for the browser and Node.js.
- [csv-writer](https://github.com/ryu1kn/csv-writer): CSV writer library.
- [commander](https://github.com/tj/commander.js/): Command-line interface library.
- [mocha](https://mochajs.org/): JavaScript test framework for Node.js programs.
- [chai](https://www.chaijs.com/): BDD / TDD assertion library for Node.js.
- [nock](https://github.com/nock/nock): HTTP mocking and expectations library for Node.js.


## Acknowledgments

- The [Hacker News API](https://github.com/HackerNews/API) for providing access to Hacker News data.
- The developers of [Mocha](https://mochajs.org/), [Chai](https://www.chaijs.com/), and [Nock](https://github.com/nock/nock) for their excellent libraries.
