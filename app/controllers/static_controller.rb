class StaticController < ApplicationController
  def show
    @quizzes = Quiz.select(:venue, :latitude, :longitude)
    render params[:page]
  end
end
