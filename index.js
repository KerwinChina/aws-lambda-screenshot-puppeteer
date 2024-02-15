const chromium = require('chrome-aws-lambda');
const AWS = require('aws-sdk');

exports.handler = async (event) => {
    let result = null;
    let browser = null;

    const queryParams = event.queryStringParameters;

    // For example, if there is a GET parameter named "url" in the URL
    const url = queryParams ? queryParams['url'] : 'https://www.google.com';
    try {
        // set up Puppeteer
        browser = await chromium.puppeteer.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath,
            headless: chromium.headless,
        });

        // open a new page
        let page = await browser.newPage();

        // navigate to the page
        await page.goto(url);

        // take a screenshot
        result = await page.screenshot({ encoding: 'base64' });
        const timestamp = new Date().toISOString();
        const fileName = `screenshot_${timestamp}.png`;

        // upload to S3 (optional)
        const s3 = new AWS.S3();
        await s3.putObject({
            Bucket: 'myimgsave',
            Key: fileName,
            Body: Buffer.from(result, 'base64'),
            ContentType: 'image/png'
        }).promise();

        const publicUrl = `https://${s3.config.endpoint}/myimgsave/${encodeURIComponent(fileName)}`;
        console.log(publicUrl); // This URL is publicly accessible
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Screenshot  successfully',
                url: publicUrl,
            }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: error.message,
            }),
        };
    } finally {
        if (browser !== null) {
            await browser.close();
        }
    }    
};
