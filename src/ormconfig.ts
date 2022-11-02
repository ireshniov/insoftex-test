import { mongo } from './mongo.ormconfig';
import { DataSource } from 'typeorm';

export default new DataSource(mongo);
