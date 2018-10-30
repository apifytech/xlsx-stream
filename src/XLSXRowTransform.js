import { Transform } from 'stream';
import { Row } from './templates';

/** Class representing a XLSX Row transformation from array to Row. */
export default class XLSXRowTransform extends Transform {
    constructor() {
        super({ objectMode: true });
        this.rowCount = 0;
    }

    static is2DArray(arr) {
        return (arr[0] !== undefined && arr[0].constructor === Array);
    }

    /**
     * Transform array to row string
     */
    _transform(row, encoding, callback) { // eslint-disable-line
        let xlsxRow = '';
        if (XLSXRowTransform.is2DArray(row)) {
            for (let i = 0; i < row.length; i++) {
                xlsxRow += Row(this.rowCount++, row[i]);
            }
        } else {
            xlsxRow = Row(this.rowCount++, row);
        }
        callback(null, xlsxRow);
    }
}
