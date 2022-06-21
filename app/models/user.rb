class User < ApplicationRecord
    has_secure_password
    has_many :journals
    has_many :events #events that you own
end
