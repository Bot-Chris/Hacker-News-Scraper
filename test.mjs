import { expect } from 'chai';
import { fetchTopStories, writeArticlesToCSV } from './index.js';
import fs from 'fs';

let nock;

before(async () => {
  nock = (await import('nock')).default;
});

describe('Hacker News Scraper', () => {
  const topStoriesMock = [1, 2, 3];
  const storyMock = {
    id: 1,
    title: 'Test Story',
    url: 'https://example.com',
    by: 'author',
    score: 100,
    descendants: 50
  };

  beforeEach(() => {
    nock('https://hacker-news.firebaseio.com')
      .get('/v0/topstories.json')
      .reply(200, topStoriesMock);

    nock('https://hacker-news.firebaseio.com')
      .get('/v0/item/1.json')
      .reply(200, storyMock);

    nock('https://hacker-news.firebaseio.com')
      .get('/v0/item/2.json')
      .reply(200, { ...storyMock, id: 2 });

    nock('https://hacker-news.firebaseio.com')
      .get('/v0/item/3.json')
      .reply(200, { ...storyMock, id: 3 });
  });

  it('should fetch top stories', async () => {
    const articles = await fetchTopStories(3);
    expect(articles).to.have.lengthOf(3);
    expect(articles[0]).to.include({
      title: 'Test Story',
      url: 'https://example.com',
      author: 'author',
      score: 100,
      comments: 50
    });
  });

  it('should write articles to CSV', async () => {
    const articles = [storyMock];
    const filePath = 'test.csv';

    await writeArticlesToCSV(articles, filePath);

    const fileExists = fs.existsSync(filePath);
    expect(fileExists).to.be.true;

    // Clean up test file
    fs.unlinkSync(filePath);
  });
});
