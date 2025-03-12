class Journal < ApplicationRecord
    belongs_to :user
    belongs_to :folder, optional: true  # This makes the folder association optional
end
