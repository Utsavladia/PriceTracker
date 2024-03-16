import { NextResponse } from "next/server";
import { scrapeAndStore } from "../../../../lib/actions";
import Product from "../../../../lib/models/product.model";
import { connectDB } from "../../../../lib/mongoose";
import { generateEmailBody, sendEmail } from "../../../../lib/nodemailer";
import { scraper } from "../../../../lib/scraper";
import { getAveragePrice, getEmailNotifType, getHighestPrice, getLowestPrice } from "../../../../lib/utils";


export const maxDuration = 300;
export const dynamic = 'force-dynamic'
export const revalidate = 0;


export async function GET() {
    try {
        connectDB();
        const products = await Product.find({});

        if (!products) throw new Error("No product found");
        // scrape all the products details and update

        const updatedProducts = await Promise.all(
            products.map(async (currentProduct) => {
                const scrapedProduct = await scraper(currentProduct.url);
                if (!scrapedProduct) throw new Error("No product Found..");



                 const updatedPriceHistory = [
                ...currentProduct.priceHistory,
                {price: scrapedProduct.currentPrice}
            ]

            const product = {
                ...scrapedProduct,
                priceHistory: updatedPriceHistory,
                lowestPrice: getLowestPrice(updatedPriceHistory),
                highestPrice: getHighestPrice(updatedPriceHistory),
                averagePrice: getAveragePrice(updatedPriceHistory),

            }
        
             //  this will store the updated product in the database of Mongoose
            const updatedProduct = await Product.findOneAndUpdate(
                { url: product.url },
                product,
                );
                
                // Check each product status and send email accordingly to users
                const emailNotiType = getEmailNotifType(scrapedProduct, currentProduct);

                if (emailNotiType && updatedProduct.users.length > 0) {
                    const productInfo = {
                        title: updatedProduct.title,
                        url: updatedProduct.url,
                    }

                    const emailContent = await generateEmailBody(productInfo, emailNotiType);
                    const userEmails = updatedProduct.users.map((user: any) => user.email)
                    
                    await sendEmail(emailContent, userEmails);
                 
                }
                   return updatedProduct
                

            })

        )
        
        return NextResponse.json({
            message: 'Ok', data: updatedProducts
        })

    } catch (error) {
        console.log(error);
    }
    
}