import { NextRequest, NextResponse } from 'next/server';
import { Client, Databases } from 'node-appwrite';

const client = new Client();
client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!) // Your Appwrite endpoint
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!); // Your Appwrite project ID

  const databases = new Databases(client);

export async function GET(request: NextRequest) {
  try {
    const transactions = await databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID!, // Database ID
      process.env.APPWRITE_TRANSACTION_COLLECTION_ID! // Collection ID
    );

    return NextResponse.json({ transactions: transactions.documents }, { status: 200 });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json({ error: "Error fetching transactions" }, { status: 500 });
  }
}
