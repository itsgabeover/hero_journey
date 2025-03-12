class Folder < ApplicationRecord
  belongs_to :user
  has_many :journals, dependent: :nullify  # Use :destroy if you want journals removed with the folder
end
