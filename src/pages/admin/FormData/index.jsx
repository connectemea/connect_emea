import React, { useEffect, useState } from 'react';
import { fetchRecords } from '@/utils/airtableService';

function Index() {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedTaskStatus, setSelectedTaskStatus] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await fetchRecords('interns_selection_2025', '', 'Name', 'asc');
        setRecords(data);
        setFilteredRecords(data);
      } catch (error) {
        console.error('Error fetching records:', error);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  const handleAwareMessage = (phoneNumber, name, role) => {
    if (!phoneNumber) return alert("No phone number found!");

    const cleanedNumber = phoneNumber
      .replace(/[^\d]/g, "")
      .replace(/^0+/, "");

    const finalNumber = cleanedNumber.startsWith("91")
      ? cleanedNumber
      : `91${cleanedNumber}`;

    const message = `Hello ${name}! 👋

This is a reminder for the next step of the Connect Intern Hiring 2026 — (${role}) role.

Your *offline interview* is scheduled for *tomorrow between 10:00 AM and 12:30 PM* at the *College Incubation Center (near Mahagony)*.

Please make sure to attend on time.  
All the best! 💼`;

    const url = `https://wa.me/${finalNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  // 🔄 Filtering logic
  useEffect(() => {
    let temp = [...records];

    if (searchTerm.trim() !== '') {
      temp = temp.filter((record) =>
        record.fields.Name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedYear !== 'All') {
      temp = temp.filter((record) => record.fields.year === selectedYear);
    }

    if (selectedRole !== 'All') {
      temp = temp.filter((record) => record.fields.preferred_role === selectedRole);
    }

    if (selectedDepartment !== 'All') {
      temp = temp.filter((record) => record.fields.department === selectedDepartment);
    }

    if (selectedTaskStatus !== 'All') {
      const isSubmitted = selectedTaskStatus === 'Yes';
      temp = temp.filter((record) => !!record.fields.Task_Submitted === isSubmitted);
    }

    setFilteredRecords(temp);
  }, [searchTerm, selectedYear, selectedRole, selectedDepartment, selectedTaskStatus, records]);

  const yearOptions = ['All', ...new Set(records.map((r) => r.fields.year).filter(Boolean))];
  const roleOptions = ['All', ...new Set(records.map((r) => r.fields.preferred_role).filter(Boolean))];
  const departmentOptions = ['All', ...new Set(records.map((r) => r.fields.department).filter(Boolean))];

  if (loading) {
    return (
      <div className="flex items-center justify-center mt-10">
        <div className="border-4 border-orange-500 border-t-transparent rounded-full w-12 h-12 animate-spin"></div>
        <span className="ml-4 text-lg text-gray-600">Loading records...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Intern Hiring Registrations 2026</h1>

      <div className="mb-6 text-center">
        <p className="text-lg text-gray-700">
          Below is the list of all students who have registered for the Connect Intern Hiring 2026.
          <br />
          We will be contacting the shortlisted candidates soon. Stay tuned!
        </p>
      </div>

      {/* 🔽 Filters Section */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-center mb-6 flex-wrap">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by Name"
          className="border p-2 rounded w-full md:w-64"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Year Filter */}
        <select
          className="border p-2 rounded w-full md:w-48"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          {yearOptions.map((year, index) => (
            <option key={index} value={year}>
              {year === 'All' ? 'All Years' : `Year ${year}`}
            </option>
          ))}
        </select>

        {/* Department Filter */}
        <select
          className="border p-2 rounded w-full md:w-48"
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
        >
          {departmentOptions.map((dept, index) => (
            <option key={index} value={dept}>
              {dept === 'All' ? 'All Departments' : dept}
            </option>
          ))}
        </select>

        {/* Role Filter */}
        <select
          className="border p-2 rounded w-full md:w-48"
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
        >
          {roleOptions.map((role, index) => (
            <option key={index} value={role}>
              {role === 'All' ? 'All Roles' : role}
            </option>
          ))}
        </select>

        {/* ✅ Task Submitted Filter */}
        <select
          className="border p-2 rounded w-full md:w-48"
          value={selectedTaskStatus}
          onChange={(e) => setSelectedTaskStatus(e.target.value)}
        >
          <option value="All">All Tasks</option>
          <option value="Yes">Task Submitted</option>
          <option value="No">Not Submitted</option>
        </select>
      </div>

      <div className="text-center mb-4 font-medium text-gray-800">
        Total Registrations: {filteredRecords.length}
      </div>

      {/* Cards */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecords.map((record, index) => {
          const { fields } = record;

          return (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow space-y-3 !select-text"
            >
              <h1 className="text-2xl font-bold text-center">{index + 1}</h1>
              <h2 className="text-xl font-bold text-gray-800">{fields.Name}</h2>

              <p><strong>Admission No:</strong> {fields.Admission_No}</p>
              <p><strong>Phone:</strong> {fields.Phone_number}</p>
              <p><strong>Email:</strong> {fields.email}</p>
              <p><strong>Department:</strong> {fields.department}</p>
              <p><strong>Year:</strong> {fields.year}</p>
              <p><strong>Preferred Role:</strong> {fields.preferred_role}</p>
              <p><strong>Hobby:</strong> {fields.hobby}</p>
              <p><strong>Expectations:</strong> {fields.expectations}</p>
              <p><strong>Reason for Joining:</strong> {fields.reason}</p>
              <p><strong>How did you hear?</strong> {fields.how_did_you_hear}</p>
              <p><strong>Interesting Fact:</strong> {fields.interesting_fact}</p>
              <p><strong>Other Communities:</strong> {fields.other_communities?.join(', ') || 'None'}</p>
              <p><strong>Task Submitted:</strong> {fields.Task_Submitted ? 'Yes' : 'No'}</p>
            {fields.Task_Link && (  <p>
                <strong>Task Link:</strong>
                <a href={fields.Task_Link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline ml-1">
                  (View Here)
                </a> 
              </p>
            )}

              {/* <button
                onClick={() => handleAwareMessage(fields.Phone_number, fields.Name, fields.preferred_role)}
                className="mt-4 w-full bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition-colors"
              >
                Aware Message
              </button> */}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Index;
