// script.js
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Evitar que el formulario se envíe de la manera tradicional
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    const userData = {
      email: email,
      password: password
    };
  
    // Llamar a tu API de autenticación (Node.js y MongoDB) aquí
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
  
    const data = await response.json();
  
    if (response.ok) {
      // Si la respuesta es exitosa
      alert('Inicio de sesión exitoso');
    } else {
      // Si la respuesta falla
      alert('Error: ' + data.message);
    }
  });
  