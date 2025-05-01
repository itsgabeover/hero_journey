class CreateQuests < ActiveRecord::Migration[7.2]
  def change
    create_table :quests do |t|
      t.string :title
      t.text :description
      t.string :status
      t.integer :progress
      t.integer :goal
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
