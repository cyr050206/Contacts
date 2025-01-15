import { useState, useEffect } from 'react'
import ContactList from './Components/ContactList'
import ContactForm from './Components/ContactForm';
function App() {
  const [contacts, setContacts] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentContact, setCurrentContact] = useState({})

  const closeModal = () => {
    setIsModalOpen(false)
    setCurrentContact({})
  }

  const openCreatemodal = () => {
    if (!isModalOpen) {
      setIsModalOpen(true)
    }
  }

  useEffect(() => {
    fetchContacts()
  }, [])

  const openEditModal = (contact) => {
    if (isModalOpen) return

    setCurrentContact(contact)
    setIsModalOpen(true)
  }

  const fetchContacts = async () => {
    const response = await fetch('http://localhost:5000/contacts')
    const data = await response.json()
    setContacts(data.contacts)
  };

  const onUpdate = () => {
    closeModal()
    fetchContacts()
  }

  return (
    <>
      <div className="w-full min-h-screen bg-gray-900 text-white p-4">
        <ContactList contacts={contacts} updateContact={openEditModal} updateCallback={onUpdate} />
        <button
          onClick={openCreatemodal}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Open Window
        </button>
        {isModalOpen && (
          <div className="modal fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="modal-content bg-gray-800 p-6 rounded-lg shadow-lg relative text-white">
              <span
                className="close absolute top-2 right-2 text-gray-500 hover:text-gray-300 cursor-pointer"
                onClick={closeModal}
              >
                &times;
              </span>
              <ContactForm existingContact={currentContact} updateCallback={onUpdate} />
            </div>
          </div>
        )}
      </div>
    </>
  )
}


export default App
