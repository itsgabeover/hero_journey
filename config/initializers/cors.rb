Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'https://journalquestnext.vercel.app', 'http://localhost:3000',"https://www.journal-quest.com"  # Allow your React frontend domain
    resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
      credentials: true  # Allows cookies, authentication headers, etc.
  end
end