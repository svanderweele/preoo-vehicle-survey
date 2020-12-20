import { HttpStatus, Injectable } from '@nestjs/common';
import { FilterQuery, MongoClient, MongoError } from 'mongodb';
import { CustomException } from 'src/exceptions/CustomException';
import DatabaseException from 'src/api/database/database.exception';
import { CollectionNames } from './database.types';

@Injectable()
export class DatabaseService {
  password = 'Tea123';
  databaseName = 'preoo';
  url = `mongodb+srv://Simon:${this.password}@cluster0.n4iai.gcp.mongodb.net/${this.databaseName}>?retryWrites=true&w=majority`;

  async connect(): Promise<MongoClient> {
    const client = await MongoClient.connect(this.url, {
      useUnifiedTopology: true,
    });

    if (!client) {
      throw new DatabaseException('DATABASE_CONNECTION_ERROR');
    }
    return client;
  }

  async findOne<T>(
    collectionName: CollectionNames,
    find: FilterQuery<T> = {},
  ): Promise<T> {
    const client = await this.connect();

    try {
      const db = client.db(this.databaseName);
      return await db.collection(collectionName).findOne<T>(find);
    } catch (error) {
      this.handleError(error);
    } finally {
      client.close();
    }
  }

  async findAll<T>(
    collectionName: CollectionNames,
    find: FilterQuery<T> = {},
  ): Promise<T[]> {
    const client = await this.connect();

    try {
      const db = client.db(this.databaseName);
      return await db.collection(collectionName).find(find).toArray();
    } catch (error) {
      this.handleError(error);
    } finally {
      client.close();
    }
  }

  async insert<T>(collectionName: CollectionNames, data: T): Promise<T> {
    const client = await this.connect();

    try {
      const db = client.db(this.databaseName);
      await db.collection(collectionName).insertOne(data);
      return data;
    } catch (error) {
      this.handleError(error);
    } finally {
      client.close();
    }
  }

  async insertMany<T>(
    collectionName: CollectionNames,
    data: T[],
  ): Promise<T[]> {
    const client = await this.connect();

    try {
      const db = client.db(this.databaseName);
      await db.collection(collectionName).insertMany(data);
      return data;
    } catch (error) {
      this.handleError(error);
    } finally {
      client.close();
    }
  }

  handleError(error: MongoError): CustomException {
    //TODO: Log this and throw generic error occurred. Don't give client too much details
    throw new CustomException(
      'MONGO_ERROR',
      error.code.toString(),
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
