import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
    async make(value: string): Promise<string> {
        return await bcrypt.hash(value, 10);
    }

    async compare(value: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(value, hash);
    }
}
