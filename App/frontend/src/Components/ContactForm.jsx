import React, { useState } from 'react'

const ContactForm = ({ existingContact={}, updateCallback }) => {

    const [first_name, setfirst_name] = useState(existingContact.first_name || '')
    const [last_name, setlast_name] = useState(existingContact.last_name || '')
    const [email, setEmail] = useState(existingContact.email || '')
    const [phone, setPhone] = useState(existingContact.phone || '')

    const  updating= Object.entries(existingContact).length>0

    const onSubmit = async (e) => {
        

        const data={
            first_name,
            last_name,
            email,
            phone
        }
        const url='http://127.0.0.1:5000/'+(updating?`update-contact/${existingContact.id}`:'create_contact')
        const options={
            method: updating? 'PATCH':'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        }
        const response = await fetch(url,options)
        if (response.status!==201 && response.status!==200){
            const data=await response.json()
            console.log(data.message)
           
        }
        else{
            updateCallback()
        }
    }
    return (
      <form onSubmit={onSubmit} className="max-w-lg mx-auto p-4 bg-gray-800 text-white shadow-md rounded-lg">
      <div className="mb-4">
        <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="first_name">
          First Name
        </label>
        <input
          type="text"
          id="first_name"
          value={first_name}
          onChange={(e) => setfirst_name(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="last_name">
          Last Name
        </label>
        <input
          type="text"
          id="last_name"
          value={last_name}
          onChange={(e) => setlast_name(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="phone">
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          pattern="[0-9]{10}"
          placeholder="1234567890"
          className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {updating ? 'Update' : 'Create Contact'}
        </button>
      </div>
    </form>
    )
}

export default ContactForm
