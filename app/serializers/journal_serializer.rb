class JournalSerializer < ActiveModel::Serializer
  attributes :id, :title, :body, :archetype, :user_id, :folder_id, :created_at, :updated_at
  belongs_to :user
end
