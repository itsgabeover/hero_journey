class EventSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :date, :time, :timezone
end
