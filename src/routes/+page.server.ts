import { google } from 'googleapis';
import { GOOG_CREDENTIALS, SHEET_ID } from '$env/static/private'
import type Element from '../models/Element';

const serviceEndpoint = 'https://sheets.googleapis.com/v4/spreadsheets';
const sheetId = SHEET_ID;
const sheetName = 'Elements';
const keys = JSON.parse(GOOG_CREDENTIALS);
const client = google.auth.fromJSON(keys);
// @ts-ignore -- not sure why I get ts error - need to set this for succesful authorization
client.scopes = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

const getElements = async () => {
    // A1 notation https://developers.google.com/sheets/api/guides/concepts#cell
    const range = `${sheetName}!A2:F200`;
    const options = {
        url: `${serviceEndpoint}/${sheetId}/values/${range}`,
    };

    try {
        const res: any = await client.request(options);
        const elements = mapSheetData(res.data.values);
        return elements;
    } catch (err) {
        console.error('error getting spreadsheet data', err);
        return [];
    }
};

const mapSheetData = (data: any): Element[] => {
    return data.map((row: any) => {
        return {
            name: row[0],
            category: row[1],
            revealed: false,
            sortPosition: row[2],
            urlOverride: row[3],
        } as Element;
    });
};

/** @type {import('./$types').PageLoad} */
export async function load() {
    const elements = await getElements();

    return {
        elements,
    };
}
