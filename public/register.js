document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.text();
      alert(data); // Mostrar el mensaje del servidor
    } catch (error) {
      alert('Error al registrar el usuario: ' + error.message);
    }
  });
  