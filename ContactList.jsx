import React, { useRef } from 'react';

const ContactList = ({ contacts, updateContact, updateCallback }) => {
  const tableContainerRef = useRef(null);

  const onDelete = async (id) => {
    try {
      const options = {
        method: 'DELETE',
      };
      const response = await fetch(`http://127.0.0.1:5000/delete_contact/${id}`, options);
      if (response.status === 200) {
        updateCallback();
      } else {
        console.error('Failed to delete');
      }
    } catch (error) {
      alert(error);
    }
  };

  const scrollDown = () => {
    if (tableContainerRef.current) {
      tableContainerRef.current.scrollBy({
        top: 100, // Adjust the scroll amount as needed
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="contact-list">
      <h2>Contacts</h2>
      <div className="table-container" ref={tableContainerRef}>
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.id}>
                <td>{contact.firstName}</td>
                <td>{contact.lastName}</td>
                <td>{contact.email}</td>
                <td>
                  <button className="update-button" onClick={() => updateContact(contact)}>
                    Update
                  </button>
                  <button className="delete-button" onClick={() => onDelete(contact.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="scroll-button" onClick={scrollDown}>↓</button>
    </div>
  );
};

export default ContactList;
