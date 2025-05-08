export default function SignInPage() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Login Page</h1>
      <p>Please log in to continue.</p>
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />
      <button style={{ margin: '5px' }}>Login</button>
    </div>
  );
}
