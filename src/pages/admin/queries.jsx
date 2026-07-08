import React, { useEffect, useState } from "react";
import { fetchRecordsQueries } from "@/utils/airtableService";

function Queries() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await fetchRecordsQueries("Queries_table");
        setRecords(data);
      } catch (error) {
        console.error("Error fetching records:", error);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Queries</h1>

      {loading ? (
          <div className="flex items-center justify-center mt-10">
            <div className="border-4 border-orange-500 border-t-transparent rounded-full w-12 h-12 animate-spin"></div>
            <span className="ml-4 text-lg text-gray-600">Loading records...</span>
          </div>
      ) : records.length === 0 ? (
        <p className="text-center text-gray-500">No queries found.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-md border">
          <table className="min-w-full divide-y divide-gray-200 bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Query
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Created At
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {records.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {record.fields?.email || "—"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {record.fields?.queries || "—"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {record.fields?.sent_date
                      ? new Date(record.fields.sent_date).toLocaleString()
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Queries;
