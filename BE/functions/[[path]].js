export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const path = url.pathname;

  // Handle API routes
  if (path.startsWith('/api/')) {
    return handleAPIRequest(context);
  }

  // Serve static files
  return await context.env.ASSETS.fetch(request);
}

async function handleAPIRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const path = url.pathname;
  
  try {
    switch (path) {
      case '/api/auth/login':
        return handleLogin(request, env);
      case '/api/auth/register':
        return handleRegister(request, env);
      case '/api/marketplace/products':
        return handleProducts(request, env);
      default:
        return new Response(JSON.stringify({ error: 'Endpoint not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

async function handleLogin(request, env) {
  const { email, password } = await request.json();
  
  // Query D1 database
  const { results } = await env.DB.prepare(
    "SELECT * FROM users WHERE email = ?"
  ).bind(email).all();
  
  if (results.length === 0) {
    return new Response(JSON.stringify({ error: 'User not found' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  const user = results[0];
  // Verify password (you should use proper password hashing)
  
  return new Response(JSON.stringify({
    message: 'Login successful',
    user: {
      id: user.id,
      username: user.username,
      email: user.email
    }
  }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

async function handleRegister(request, env) {
  const { username, email, password } = await request.json();
  
  // Insert into D1 database
  const result = await env.DB.prepare(
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)"
  ).bind(username, email, password).run();
  
  return new Response(JSON.stringify({
    message: 'Registration successful',
    userId: result.meta.last_row_id
  }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

async function handleProducts(request, env) {
  if (request.method === 'GET') {
    const { results } = await env.DB.prepare(
      "SELECT * FROM products WHERE status = 'active'"
    ).all();
    
    return new Response(JSON.stringify(results), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  if (request.method === 'POST') {
    const { user_id, title, description, price, category } = await request.json();
    
    const result = await env.DB.prepare(
      "INSERT INTO products (user_id, title, description, price, category) VALUES (?, ?, ?, ?, ?)"
    ).bind(user_id, title, description, price, category).run();
    
    return new Response(JSON.stringify({
      message: 'Product created',
      productId: result.meta.last_row_id
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  return new Response(JSON.stringify({ error: 'Method not allowed' }), {
    status: 405,
    headers: { 'Content-Type': 'application/json' }
  });
}