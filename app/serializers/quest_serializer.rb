class QuestSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :status, :progress, :goal, :created_at, :updated_at
end