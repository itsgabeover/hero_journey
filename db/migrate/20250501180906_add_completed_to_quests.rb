class AddCompletedToQuests < ActiveRecord::Migration[7.2]
  def change
    add_column :quests, :completed, :boolean, default: false
  end
end
