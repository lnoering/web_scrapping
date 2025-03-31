# Scrapping something from specficic URL's.


## What Need

1) Docker installed
2) the csv file with the urls.
    - The file need be [urls.csv](https://github.com/lnoering/web_scrapping/blob/main/urls.csv)

## How To Use

1)  Define the rule to scrap.
    
    > Need define that on this file: [scraper.js](https://github.com/lnoering/web_scrapping/blob/main/scraper.js)
    
    > On this sample you will see the the rule to scrap on line 45.
    ```code
    const heading = await page.$eval('h1[data-toc-skip]', el => el.innerText.trim());
    ```

2) You should have the docker on your machine running.

3) Build the image
    - Inside the root folder of this project use the command:
    ```code
        bin/build
    ```

4) Create the container.
    ```code
        bin/start
    ```

5) Run the scrapper file
    ```code
        bin/run
    ```

6) The file will create the [output.csv](https://github.com/lnoering/web_scrapping/blob/main/output.csv) and you will see on console the process executing.

## Notes

- This was executed on MAC, with apple chip.


## Images
> [urls.csv](https://github.com/lnoering/web_scrapping/blob/main/urls.csv)

![urls.csv](https://github.com/lnoering/web_scrapping/blob/main/image/urls.csv.png)

> [output.csv](https://github.com/lnoering/web_scrapping/blob/main/output.csv)

![output.csv](https://github.com/lnoering/web_scrapping/blob/main/image/output.csv.png)
