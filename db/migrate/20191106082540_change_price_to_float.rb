class ChangePriceToFloat < ActiveRecord::Migration[5.2]
  def change
    change_column :quizzes, :price, :float
  end
end
