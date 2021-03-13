class SitemapController < ApplicationController
  def index
    @host = "#{request.protocol}#{request.host}"
    @quizzes = Quiz.all
  end
end