Rails.application.config.session_store :cookie_store,
  key: '_hero_journey_session',
  same_site: :none, # ✅ best for localhost
  secure: false    # ✅ allow http during development