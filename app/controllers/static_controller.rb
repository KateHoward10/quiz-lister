class StaticController < ApplicationController  
  def letsencrypt
    render text: "#{ENV['LETS_ENCRYPT_KEY']}"
  end

  def show
    @quizzes = Quiz.all
    @locations = Quiz.select(:id, :venue, :latitude, :longitude)
    render params[:page]
  end
end
