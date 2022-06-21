class Event < ApplicationRecord
    belongs_to :user
    has_many :users, through: :event_attendees
end
