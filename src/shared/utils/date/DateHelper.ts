export class DateHelper {
    static readonly FORMAT = 'YYYY-MM-DD HH:mm:ss';

    static parse(dateInput: string | number | Date): Date {
        if (typeof dateInput === 'string' || dateInput instanceof Date) {
            return new Date(dateInput);
        }
        if (typeof dateInput === 'number') {
            return new Date(dateInput * 1000);
        }
        throw new Error('Invalid date input');
    }

    static format(date: Date): string {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    static standardize(dateInput: string | number): string {
        const date = this.parse(dateInput);
        return this.format(date);
    }
}
