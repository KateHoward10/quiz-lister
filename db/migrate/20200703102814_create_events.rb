class CreateEvents < ActiveRecord::Migration[5.2]
  def up
    remove_column :quizzes, :dates, :date

    create_table :events do |t|
      t.date :date

      t.timestamps
    end
  end

  def down
    drop_table :events
    add_column :quizzes, :dates, :date, array: true, default: []
  end
end
