class QuizzesController < ApplicationController
  before_action :set_quiz, only: [:show, :edit, :update, :destroy, :toggle_favorite]
  before_action :authenticate_user!, except: [:index, :show]
  before_action :require_same_user!, only: [:update, :edit, :destroy]

  # GET /quizzes
  # GET /quizzes.json
  def index
    @search = Quiz.ransack(params[:q])
    @quizzes = @search.result.sort_by { |q| q.venue.gsub("The ", "") }
  end

  # GET /quizzes/1
  # GET /quizzes/1.json
  def show
  end

  # GET /quizzes/new
  def new
    @quiz = Quiz.new
  end

  # GET /quizzes/1/edit
  def edit
  end

  # POST /quizzes
  # POST /quizzes.json
  def create
    @quiz = Quiz.new(quiz_params)
    @quiz.user = current_user

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

  # PATCH/PUT /quizzes/1
  # PATCH/PUT /quizzes/1.json
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

  # DELETE /quizzes/1
  # DELETE /quizzes/1.json
  def destroy
    @quiz.destroy
    respond_to do |format|
      format.html { redirect_to quizzes_url, notice: 'Quiz was successfully destroyed.' }
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
        redirect_to quiz_path(@quiz)
        flash[:alert] = "You can only edit or delete your own quizzes."
      end
    end
  
    # Never trust parameters from the scary internet, only allow the white list through.
    def quiz_params
      params.require(:quiz).permit(:venue, :day, :frequency, :time, :price, :prize, :status, :link, :postcode, :latitude, :longitude, :address, :hue)
    end
end
