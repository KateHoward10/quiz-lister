class AddHueToQuizzes < ActiveRecord::Migration[5.2]
  def change
    add_column :quizzes, :hue, :integer
  end
end
