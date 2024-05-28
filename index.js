import axios from 'axios';
import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';
import { program } from 'commander';
import { fileURLToPath } from 'url';
import path from 'path';

// Command line arguments
program
  .option('-n, --number <number>', 'Number of top articles to fetch', 10)
  .option('-o, --output <file>', 'Output CSV file', 'hackernewsTopTen.csv')
  .parse(process.argv);

const options = program.opts();
const numArticles = parseInt(options.number);
const outputFile = options.output;

export const fetchTopStories = async (num) => {
  console.log('Fetching top stories...');
  const topStoriesUrl = 'https://hacker-news.firebaseio.com/v0/topstories.json';
  const storyUrl = (id) => `https://hacker-news.firebaseio.com/v0/item/${id}.json`;

  try {
    const response = await axios.get(topStoriesUrl);
    const topStoryIds = response.data.slice(0, num); // Get top N story IDs

    const storyPromises = topStoryIds.map(id => axios.get(storyUrl(id)));
    const stories = await Promise.all(storyPromises);

    const articles = stories.map(story => ({
      title: story.data.title || 'N/A',
      url: story.data.url || 'N/A',
      author: story.data.by || 'N/A',
      score: story.data.score || 0,
      comments: story.data.descendants || 0,
    }));

    console.log('Fetched articles:', articles);
    return articles;
  } catch (error) {
    console.error('Error fetching stories:', error);
    throw error;
  }
};

export const writeArticlesToCSV = async (articles, filePath) => {
  console.log('Writing articles to CSV...');
  const csvWriter = createCsvWriter({
    path: filePath,
    header: [
      { id: 'title', title: 'Title' },
      { id: 'url', title: 'URL' },
      { id: 'author', title: 'Author' },
      { id: 'score', title: 'Score' },
      { id: 'comments', title: 'Comments' }
    ]
  });

  try {
    await csvWriter.writeRecords(articles);
    console.log(`Successfully written to ${filePath}`);
  } catch (error) {
    console.error('Error writing to CSV:', error);
    throw error;
  }
};

const main = async () => {
  try {
    const articles = await fetchTopStories(numArticles);
    await writeArticlesToCSV(articles, outputFile);
    console.log(`Top ${numArticles} articles have been written to ${outputFile}`);
  } catch (error) {
    console.error('Error fetching top stories:', error);
  }
};

// Check if the script is being run directly
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
if (process.argv[1] === __filename) {
  main();
}
