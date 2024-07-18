// Array to store events
let events = [];

// Function to display events
function displayEvents() {
  const eventsList = document.getElementById('events-list');
  eventsList.innerHTML = ''; // Clear previous events

  events.forEach((event) => {
    const eventItem = document.createElement('li');
    eventItem.textContent = `${event.date} - ${event.time} ${event.name} - ${event.description}`;
    // Create Delete Link
    const deleteLink = document.createElement('a');
    deleteLink.textContent = 'Excluir';
    deleteLink.href = '#'; // Replace with actual delete URL if available
    deleteLink.classList.add('delete-link'); // Add a class for styling

    // Delete Link Click Event Listener
    deleteLink.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent default link behavior
      events.splice(index, 1);
      displayEvents();
    });
    eventItem.appendChild(deleteLink);
    eventsList.appendChild(eventItem);
  });
}

// Event form submit handler
const eventForm = document.getElementById('event-form');
eventForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent default form submission

  const eventDate = document.getElementById('eventDate').value;
  const eventTime = document.getElementById('eventTime').value;
  const eventName = document.getElementById('eventName').value;
  const eventDescription = document.getElementById('eventDescription').value;

  // Create a new event object
  const newEvent = {
    date: eventDate,
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