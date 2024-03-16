import axios from "axios";
import * as cheerio from "cheerio"
import { extractCurrency, extractDescription, extractPrice } from "../utils";
export async function scraper(productUrl: string) {
    if (!productUrl) return;
//curl --proxy brd.superproxy.io:22225 --proxy-user brd-customer-hl_21795d00-zone-price_tracker:b5edl48zvjke -k https://lumtest.com/myip.json
// Bright data configurations
    const username = String(process.env.BRIGHT_DATA_USERNAME);
    const password = String(process.env.BRIGHT_DATA_PASSWORD);
    const port = 22225
    const session_id = (100000 * Math.random()) | 0;
    const options = {
        auth: {
            username: `${username}-session-${session_id}`,
            password,
        },
        host: 'brd.superproxy.io',
        port,
        rejectUnauthorized: false,
    }

    try {
        const response = await axios.get(productUrl, options) 
        const $ = cheerio.load(response.data);
        const title = $('#productTitle').text().trim()
        const currentprice = extractPrice(
            // $('span.a-price-whole')
            $('.priceToPay span.a-price-whole'),
            $('a.size.base.a-color-price'),
            $('.a-button-selected .a-color-base'),

        );

        const originalPrice = extractPrice(
            $('#priceblock_ourprice'),
            $('.a-price.a.text-price span.a-offscreen'),
            $('#priceblock_dealprice'),
            $('#listPrice'),
            $('.a-size-base.a-color-price')
        )

        const outOfStock = 
            $('#availability span').text().trim().toLowerCase() === 'currently unavailable';
        
        const images = $('#imgBlkFront').attr('data-a-dynamic-image') ||
            $('#landingImage').attr('data-a-dynamic-image')|| '{}';
        const imageUrls = Object.keys(JSON.parse(images))

        const currency = extractCurrency($('.a-price-symbol'));
        const discountRate = $('.savingPercentage').text().replace(/[-%]/g, "");

        const description = extractDescription($);

        const data = {
            url : productUrl,
            currency: currency || '',
            image: imageUrls[0],
            title,
            currentPrice: Number(currentprice) || Number(originalPrice),
            originalPrice: Number(originalPrice) || Number(currentprice),
            priceHistory: [],
            category: 'category',
            reviewsCount: 100,
            stars: 4.5,
            isOutOfStock: outOfStock,
            description,
            discountRate,
            lowestPrice: Number(currentprice) || Number(originalPrice),
            highestPrice: Number(originalPrice) || Number(currentprice),
            averagePrice: Number(currentprice)|| Number(originalPrice),
        }
        
        return data;

        
    } catch (error : any) {
        throw new Error(`failed with the erro: ${error.message}`)
    }


}