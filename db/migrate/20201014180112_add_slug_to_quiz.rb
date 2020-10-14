class AddSlugToQuiz < ActiveRecord::Migration[5.2]
  def change
    add_column :quizzes, :slug, :string
  end
end
