class QuizzesController < ApplicationController
  before_action :set_quiz, only: [:show, :edit, :update, :destroy, :toggle_favorite]
  before_action :authenticate_user!, except: [:index, :show]
  before_action :require_same_user!, only: [:update, :edit, :destroy]

  def index
    @search = Quiz.ransack(params[:q])
    @quizzes = @search.result.sort_by { |q| q.venue.gsub("The ", "") }
  end

  def my_quizzes
    @quizzes = current_user.try(:admin?) ? Quiz.all : current_user.quizzes
  end

  def calendar
    @events = current_user.events.sort_by { |e| e.date }
  end

  def show
  end

  def new
    @quiz = Quiz.new
  end

  def edit
  end

  def create
    @quiz = Quiz.new(quiz_params)
    @quiz.user = current_user
    @quiz.hue = helpers.getRandomHue(@quiz.day)

    respond_to do |format|
      if @quiz.save
        format.html { redirect_to @quiz, notice: 'Quiz was successfully created.' }
        format.json { render :show, status: :created, location: @quiz }
      else
        format.html { render :new }
        format.json { render json: @quiz.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    respond_to do |format|
      if @quiz.update(quiz_params)
        format.html { redirect_to @quiz, notice: 'Quiz was successfully updated.' }
        format.json { render :show, status: :ok, location: @quiz }
      else
        format.html { render :edit }
        format.json { render json: @quiz.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @quiz.destroy
    respond_to do |format|
      format.html { redirect_to quizzes_url, notice: 'Quiz was successfully deleted.' }
      format.json { head :no_content }
    end
  end

  def toggle_favorite
    current_user.favorited?(@quiz) ? current_user.unfavorite(@quiz) : current_user.favorite(@quiz)
  end

  private
    def set_quiz
      @quiz = Quiz.find(params[:id])
    end

    def require_same_user!
      if !current_user.try(:admin?) && current_user != @quiz.user
        redirect_to @quiz
        flash[:alert] = "You can only edit or delete your own quizzes."
      end
    end
  
    # Never trust parameters from the scary internet, only allow the white list through.
    def quiz_params
      params.require(:quiz).permit(:venue, :day, :frequency, :time, :price, :prize, :status, :link, :postcode, :latitude, :longitude, :address)
    end
end
