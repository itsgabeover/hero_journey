Rails.application.config.session_store :cookie_store,
  key: '_journal_quest_session',
  same_site: :none, # ✅ best for localhost
  secure: true    # ✅ allow http during development