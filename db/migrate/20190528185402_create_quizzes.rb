class CreateQuizzes < ActiveRecord::Migration[5.2]
  def change
    create_table :quizzes do |t|
      t.string :venue
      t.string :day
      t.string :frequency
      t.string :time
      t.integer :price
      t.string :prize
      t.string :status
      t.string :link
      t.string :postcode

      t.timestamps
    end
  end
end
