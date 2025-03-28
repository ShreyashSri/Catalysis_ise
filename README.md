# Resume Generator v2

A modern web application that helps users create professional resumes and cover letters using AI technology. The application features a neobrutalistic cyberpunk theme and includes ATS (Applicant Tracking System) analysis capabilities.

## Features

- 🤖 AI-powered resume generation
- 🎨 Modern neobrutalistic cyberpunk design
- 📊 ATS scoring and analysis
- 💡 Smart improvement suggestions
- 📝 Professional resume templates
- 🔄 PDF to DOCX conversion
- 🔒 Secure user authentication
- 📱 Responsive design

## Prerequisites

- Python 3.8 or higher
- pip (Python package manager)
- OpenAI API key
- Google Gemini API key
- Anthropic API key

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/Catalysis_ise.git
```
2. Navigate to the repo:
```
cd Catalysis_ise
```

3. Create a virtual environment and activate it:

4. Install the required packages:

5. Create a `.env` file in the root directory and add your API keys:
```env
OPENAI_API_KEY=your_openai_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here
ANTHROPIC_API_KEY=your_anthropic_api_key_here
FLASK_SECRET_KEY=your_secret_key_here
DATABASE_URL=sqlite:///resume_builder.db
```

## Usage

1. Start the application:
```bash
npm run dev
```

2. Open your web browser and navigate to:
```
http://localhost:5000
```

3. Create an account or log in to start building your resume.

## Features in Detail

### Resume Creation
- Fill out the comprehensive form with your professional information
- Add work experience, education, and skills
- Generate a professionally formatted resume using AI

### ATS Analysis
- Upload your resume for ATS compatibility analysis
- Get detailed scores for keyword matching, format compatibility, and content relevance
- Receive specific suggestions for improvement

### AI-Powered Features
- Smart content generation using OpenAI GPT-4
- Fallback to Google Gemini and Anthropic Claude for reliability
- Intelligent keyword suggestions for ATS optimization

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- OpenAI for GPT-4 API
- Google for Gemini API
- Anthropic for Claude API
- Flask framework
- All contributors and users of the application 
