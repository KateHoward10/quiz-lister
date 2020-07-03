class AddQuizToEvents < ActiveRecord::Migration[5.2]
  def change
    add_reference :events, :quiz, foreign_key: true, type: :uuid
  end
end
