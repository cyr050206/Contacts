import React from 'react';

function ContactList({ contacts, updateContact, updateCallback }) {

  const onDelete = async (id) => {
    const url = `http://127.0.0.1:5000//delete_contact/${id}`;
    try {
      const options = {
        method: 'DELETE'
      }
      const response = await fetch(url, options)
      if (response.status === 200) {
        updateCallback()
      }
      else {
        console.error('Failed to delete contact')
      }
    }
    catch (error) {
      // alert(error)
    }
  }

  return (
    <>
      <table className="min-w-full divide-y divide-gray-700 bg-gray-800 text-white">
        <thead className="bg-gray-900">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">First Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Last Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Phone</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-gray-800 divide-y divide-gray-700">
          {contacts.map(contact => (
            <tr key={contact.id}>
              <td className="px-6 py-4 whitespace-nowrap">{contact.first_name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{contact.last_name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{contact.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{contact.phone}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" onClick={() => updateContact(contact)}>Update</button>
                <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ml-4" onClick={()=> onDelete(contact.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ContactList 