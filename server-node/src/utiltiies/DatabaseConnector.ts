import { HttpException, HttpStatus } from '@nestjs/common';
import { FilterQuery, MongoClient, MongoError } from 'mongodb';
import { CustomException } from 'src/exceptions/CustomException';
import DatabaseException from 'src/exceptions/DatabaseException';

const password = 'Tea123';
const databaseName = 'preoo';
const url = `mongodb+srv://Simon:${password}@cluster0.n4iai.gcp.mongodb.net/${databaseName}>?retryWrites=true&w=majority`;

async function connect(): Promise<MongoClient> {
  const client = await MongoClient.connect(url, { useUnifiedTopology: true });

  if (!client) {
    throw new DatabaseException('DATABASE_CONNECTION_ERROR');
  }
  return client;
}

export type CollectionNames = 'surveys_vehicle01';

export async function findOne<T>(
  collectionName: CollectionNames,
  find: FilterQuery<T> = {},
): Promise<T> {
  const client = await connect();

  try {
    const db = client.db(databaseName);
    return await db.collection(collectionName).findOne<T>(find);
  } catch (error) {
    handleError(error);
  } finally {
    client.close();
  }
}

export async function findAll<T>(
  collectionName: CollectionNames,
  find: FilterQuery<T> = {},
): Promise<T[]> {
  const client = await connect();

  try {
    const db = client.db(databaseName);
    return await db.collection(collectionName).find(find).toArray();
  } catch (error) {
    handleError(error);
  } finally {
    client.close();
  }
}

export async function insert<T>(
  collectionName: CollectionNames,
  data: T,
): Promise<T> {
  const client = await connect();

  try {
    const db = client.db(databaseName);
    await db.collection(collectionName).insertOne(data);
    return data;
  } catch (error) {
    handleError(error);
  } finally {
    client.close();
  }
}

export async function insertMany<T>(
  collectionName: CollectionNames,
  data: T[],
): Promise<T[]> {
  const client = await connect();

  try {
    const db = client.db(databaseName);
    await db.collection(collectionName).insertMany(data);
    return data;
  } catch (error) {
    handleError(error);
  } finally {
    client.close();
  }
}

function handleError(error: MongoError): CustomException {
  //TODO: Log this and throw generic error occurred. Don't give client too much details
  throw new CustomException(
    'MONGO_ERROR',
    error.code.toString(),
    HttpStatus.INTERNAL_SERVER_ERROR,
  );
}
