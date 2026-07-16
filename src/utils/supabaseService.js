import { supabase } from '../config/supabase';

/**
 * Creates a query record in the Supabase 'queries' table.
 */
export const createRecord = async (tableName, fields, url_ID) => {
  try {
    const recordData = {
      email: fields.email || null,
      queries: fields.queries || null
    };

    const { data, error } = await supabase
      .from('queries')
      .insert([recordData])
      .select();

    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error("Error creating query in Supabase:", error);
    throw error;
  }
};

/**
 * Fetches contact queries from Supabase and formats them.
 */
export const fetchRecordsQueries = async (tableName) => {
  try {
    const { data, error } = await supabase
      .from('queries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return (data || []).map(row => ({
      id: row.id,
      fields: {
        email: row.email,
        queries: row.queries,
        sent_date: row.created_at
      }
    }));
  } catch (error) {
    console.error("Error fetching queries from Supabase:", error);
    throw error;
  }
};
