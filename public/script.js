async function fetchLeaveRequests() {
  try {
      const response = await fetch('/api/leave');
      if (!response.ok) {
          throw new Error('Failed to fetch leave requests');
      }
      const data = await response.json();
      const notificationList = document.getElementById('notificationList');
      notificationList.innerHTML = '';

      data.forEach(leave => {
          const li = document.createElement('li');
          li.textContent = leave.message;
          notificationList.appendChild(li);
      });

      const notificationCount = document.getElementById('notificationCount');
      notificationCount.textContent = data.length.toString(); 
  } catch (error) {
      console.error('Error:', error);
      alert('Failed to fetch leave requests');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  fetchLeaveRequests();
});

const form = document.getElementById('leaveForm');
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const message = document.getElementById('leaveMessage').value;

  try {
      const response = await fetch('/api/leave', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ user: 'user_id', message })
      });

      if (response.ok) {
          alert('Leave request submitted successfully');
          document.getElementById('leaveMessage').value = '';
          fetchLeaveRequests(); 
      } else {
          const error = await response.json();
          alert(`Error: ${error.message}`);
      }
  } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit leave request');
  }
});
