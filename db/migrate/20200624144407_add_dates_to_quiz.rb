class AddDatesToQuiz < ActiveRecord::Migration[5.2]
  def change
    add_column :quizzes, :dates, :date, array: true, default: []
  end
end
