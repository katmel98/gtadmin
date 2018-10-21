import { Rule } from './rule';

export class Permission {
    id: string;
    name: string;
    descrip: string;
    rules: Rule[];
}