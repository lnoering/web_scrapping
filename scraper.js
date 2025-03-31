const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { parse } = require('json2csv');

// Define file paths
const urlsFilePath = path.join(__dirname, 'urls.csv'); // Your CSV file with URLs
const filePath = path.join(__dirname, 'scrap-output.csv'); // Output CSV file

// Array to hold URLs
let urls = [];

// Read the URLs from the CSV file
fs.createReadStream(urlsFilePath)
    .pipe(csv())
    .on('data', (row) => {
        // Assuming the CSV file has a column named 'URL'
        if (row.URL) {
            urls.push(row.URL);
        }
    })
    .on('end', () => {
        console.log('CSV file successfully processed');
        // runScraping();
        scrapeUrls(urls);
    });


const scrapeUrls = async (urls) => {
    const writeStream = fs.createWriteStream(path.join(__dirname, 'output.csv'), { flags: 'a' });

    // Write headers only once
    writeStream.write('URL,Result\n');

    // Function to handle scraping logic
    const scrapePage = async (browser, url) => {
        const page = await browser.newPage();
        try {
            console.log(`Scraping: ${url}`);
            await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

            // Extract <h1 class="head_title">
            // const heading = await page.$eval('h1.head_title', el => el.innerText.trim());
            const heading = await page.$eval('h1[data-toc-skip]', el => el.innerText.trim());
            
            console.log(`Title for ${url}: ${heading}`);

            // Append result to CSV
            const csvLine = `${url},"${heading}"\n`;
            writeStream.write(csvLine);
        } catch (error) {
            console.error(`Error scraping ${url}:`, error.message);
            writeStream.write(`${url},"Error: ${error.message}"\n`);
        }
        await page.close();
    };

    let browser;
    const batchSize = 5; // Number of URLs to scrape before restarting the browser
    let count = 0;

    for (const url of urls) {
        if (count % batchSize === 0) {
            // Restart browser after every batch of URLs
            if (browser) {
                await browser.close();
            }
            browser = await puppeteer.launch({
                headless: true,
                args: ['--no-sandbox', '--disable-setuid-sandbox']
            });
        }

        await scrapePage(browser, url);
        count++;
    }

    if (browser) {
        await browser.close();
    }
    writeStream.end();
    console.log('✅ Data saved to output.csv');
};
