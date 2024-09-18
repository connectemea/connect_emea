const airtableApiUrl_hiring = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID_HIRING}`;
const airtableApiUrl_queries = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID_QUERIES}`;
const apiKey = import.meta.env.VITE_AIRTABLE_API_KEY;

export const fetchRecords = async (tableName, filterParams, sortField, sortDirection, maxRecords) => {
    try {
        const url = new URL(`${airtableApiUrl}/${tableName}`);

        url.searchParams.append('filterByFormula', filterParams);
        url.searchParams.append('sort[0][field]', sortField);
        url.searchParams.append('sort[0][direction]', sortDirection);
        url.searchParams.append('maxRecords', maxRecords);

        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${apiKey}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Error fetching records: ${response.statusText}`);
        }

        const data = await response.json();
        return data.records;

    } catch (error) {
        console.error("Error fetching records:", error);
        throw error;
    }
};

export const createRecord = async (tableName, fields, url_ID) => {
    try {
        const url = `${url_ID === 1 ? airtableApiUrl_hiring : airtableApiUrl_queries}/${tableName}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fields
            })
        });

        if (!response.ok) {
            throw new Error(`Error creating record: ${response.statusText}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Error creating record:", error);
        throw error;
    }
};

