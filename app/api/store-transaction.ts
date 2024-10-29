import { NextRequest, NextResponse } from 'next/server';
import { Client, Databases } from 'node-appwrite';

const client = new Client();
client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!) // Your Appwrite endpoint
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!); // Your Appwrite project ID

const databases = new Databases(client);

export async function POST(request: NextRequest) {
  const { amount, note, email, accountNumber, transactionId } = await request.json();

  try {
    await databases.createDocument(
      process.env.APPWRITE_DATABASE_ID!, // Database ID
      process.env.APPWRITE_TRANSACTION_COLLECTION_ID!, // Collection ID
      'unique()', 
      {
        amount,
        status,
        email,
        transactionId,
        date: new Date().toISOString(),
      }
    );

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('Error storing transaction:', error);
    return NextResponse.json({ error: 'Error storing transaction' }, { status: 500 });
  }
}
