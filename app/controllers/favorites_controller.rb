class FavoritesController < ApplicationController
  def index
    @quizzes = Quiz.all
    @favourites = current_user.favorited_by_type('Quiz')
  end
end