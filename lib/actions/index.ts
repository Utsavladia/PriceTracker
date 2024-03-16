"use server"
import { revalidatePath } from "next/cache";
import Product from "../models/product.model";
import { connectDB } from "../mongoose";
import { scraper } from "../scraper";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";
import { User } from "../../types";
import { generateEmailBody } from "../nodemailer";


export async function scrapeAndStore(productUrl: string) {
    
    if (!productUrl) return;
    try {
        connectDB();
        const scrapedProduct = await scraper(productUrl);
        if (!scrapedProduct) return;

        let product = scrapedProduct;
        const existingProduct = await Product.findOne({ url: scrapedProduct.url })
        if (existingProduct) {
            const updatedPriceHistory: any = [
                ...existingProduct.priceHistory,
                {price: scrapedProduct.currentPrice}
            ]

            product = {
                ...scrapedProduct,
                priceHistory: updatedPriceHistory,
                lowestPrice: getLowestPrice(updatedPriceHistory),
                highestPrice: getHighestPrice(updatedPriceHistory),
                averagePrice: getAveragePrice(updatedPriceHistory),

            }
        }
//  this will store the updated product in the database of Mongoose
        const newProduct = await Product.findOneAndUpdate(
            { url: scrapedProduct.url },
            product,
            { upsert: true, new: true },
        );

        // in next.js we need to revalidate the page when changed
        revalidatePath(`/products/${newProduct._id}`);

    }
    catch (error: any) {
        throw new Error(`The error we got is: ${error.message}`)
    }

    
}

export async function getProductById(productId: string) {
    try {
        connectDB();
        const product = await Product.findOne({ _id: productId });
        if (!product) return null;
        return product;
    } catch (error) {
        console.log(error);
    }
    
}

export async function getAllProducts() {
    try {
        connectDB();
        const allProducts = await Product.find();
        return allProducts
        
    } catch (error) {
        console.log(error)
    }
    
}

export async function addUserEamilToProduct(productId: string, userEmail: string) {
    try {
        const product = await getProductById(productId);
        if (!product) return;
        const existingUser = product.users.some((user: User) => user.email === userEmail);
        if (!existingUser) {
            product.users.push({ email: userEmail });
            await product.save();

            const emailContent = generateEmailBody(product, "WELCOME");
            await sendEmail(emailContent, [userEmail])
        }

    }
    catch (error) {
        console.log(error);
    }
}