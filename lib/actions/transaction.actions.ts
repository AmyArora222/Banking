"use server";

import { ID,Query } from "node-appwrite";
import { createAdminClient } from "../appwrite";
import { parseStringify } from "../utils";

const {
  NEXT_PUBLIC_APPWRITE_DATABASE_ID: DATABASE_ID,
  NEXT_PUBLIC_APPWRITE_TRANSACTION_COLLECTION_ID: TRANSACTION_COLLECTION_ID,
} = process.env;


export const createTransaction = async (transaction: CreateTransactionProps) => {
  try {
    const { database } = await createAdminClient();

    const newTransaction = await database.createDocument(
      DATABASE_ID!,
      TRANSACTION_COLLECTION_ID!,
      ID.unique(),
      { 
        ...transaction
      }
    )
    return parseStringify(newTransaction);
  } catch (error) {
    console.log(error); 
  }
}


export const getTransactions = async () => {
  try {
    const { database } = await createAdminClient();

   
    const transactions = await database.listDocuments(
      DATABASE_ID!,
      TRANSACTION_COLLECTION_ID!,
      
    );

    
    return parseStringify(transactions);
  } catch (error) {
    console.log(error); 
  }
}
