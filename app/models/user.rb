class User < ApplicationRecord
    has_secure_password
    has_many :journals, dependent: :destroy
    has_many :folders, dependent: :destroy
end
