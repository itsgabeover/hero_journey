class JournalSerializer < ActiveModel::Serializer
  attributes :id, :title, :body, :tags
  belongs_to :user
end
