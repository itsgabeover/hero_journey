Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'https://hero-journey-frontend.onrender.com', 'http://localhost:4000'  # Allow your React frontend domain
    resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
      credentials: true  # Allows cookies, authentication headers, etc.
  end
end