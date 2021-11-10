import { environment } from '../../environments/environment';
import { Upload } from './upload.model';
import * as moment from 'moment';

const base_url = environment.base_url;

export class Profesor {

    constructor(
        public universidad: string,
    ) {}   
}
