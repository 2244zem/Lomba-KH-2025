// Contoh: src/components/Register.jsx
import { useState } from 'react';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault(); // ⚠️ Jangan lupa ini!

    console.log('Mengirim data:', { name, email, password }); // 🐞 Debug

    try {
      const response = await fetch('/api/auth/register.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password })
      });

      const result = await response.json();
      console.log('Response dari server:', result); // 🐞 Debug

      if (response.ok) {
        alert('Pendaftaran berhasil!');
      } else {
        alert('Error: ' + result.message);
      }
    } catch (error) {
      console.error('Error:', error); // 🐞 Debug
      alert('Tidak dapat terhubung ke server.');
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input
        type="text"
        placeholder="Nama"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Daftar</button>
    </form>
  );
}