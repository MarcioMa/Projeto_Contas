// Array to store events
let events = [];

// Function to display events
function displayEvents() {
  const eventsList = document.getElementById('events-list');
  eventsList.innerHTML = ''; 

  events.forEach((event) => {
    const eventItem = document.createElement('li');
    eventItem.textContent = `${event.date} - ${event.time} ${event.name} - ${event.description}`;
    
    // Create Delete Link
    const deleteLink = document.createElement('a');
    deleteLink.textContent = 'Excluir';
    deleteLink.href = '#'; 
    deleteLink.classList.add('delete-link'); 

    // Delete Link Click Event Listener
    deleteLink.addEventListener('click', (event) => {
      if (confirm("Are you sure you want to delete this record?")) {
        event.preventDefault();
        events.splice(index, 1);
        displayEvents();
      }
    });
    eventItem.appendChild(deleteLink);
    eventsList.appendChild(eventItem);
  });
}

// Event form submit handler
const eventForm = document.getElementById('event-form');
eventForm.addEventListener('submit', (event) => {
  event.preventDefault(); 

  const eventDate = document.getElementById('eventDate').value;
  const eventTime = document.getElementById('eventTime').value;
  const eventName = document.getElementById('eventName').value;
  const eventDescription = document.getElementById('eventDescription').value;

  const dateObject = new Date(eventDate);

  const formattedDate = dateObject.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  // Create a new event object
  const newEvent = {
    date: formattedDate,
    time: eventTime,
    name: eventName,
    description: eventDescription
  };

  // Add the new event to the events array
  events.push(newEvent);

  // Clear the form fields
  eventForm.reset();

  // Update the displayed events
  displayEvents();
});

// Initial display of events (if any stored in local storage)
displayEvents();

// Button Click Event Listener
const saveButton = document.getElementById('save-button');
saveButton.addEventListener('click', (event) => {
  eventForm.dispatchEvent(new Event('submit'));
});