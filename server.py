from flask import Flask, request, jsonify
from pydantic import BaseModel, ValidationError
import google.generativeai as genai
from flask_cors import CORS
import markdown2
import os
from dotenv import load_dotenv, dotenv_values



load_dotenv()
key = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=key)

generation_config = {
    "temperature": 1,
    "top_p": 0.95,
    "top_k": 0,
    "max_output_tokens": 8192,
}

safety_settings = [
    {
        "category": "HARM_CATEGORY_HARASSMENT",
        "threshold": "BLOCK_NONE"
    },
    {
        "category": "HARM_CATEGORY_HATE_SPEECH",
        "threshold": "BLOCK_NONE"
    },
    {
        "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        "threshold": "BLOCK_NONE"
    },
    {
        "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
        "threshold": "BLOCK_NONE"
    },
]

custom_prompt = """ You are a Travel assistant, You will answer queries about cities around world, like where to go, what to do, what to eat. But keep it short and crisp to 4-5 lines. Also, u can plan itenaries and answer general trivia about city or country
"""

model = genai.GenerativeModel(
    model_name="gemini-1.5-pro-latest",
    generation_config=generation_config,
    safety_settings=safety_settings,
    system_instruction=custom_prompt
)

app = Flask(__name__)
CORS(app)

def modify(message: str):
    message = markdown2.markdown(message, extras=["fenced-code-blocks"])
    return message
class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str



@app.route("/chat", methods=["POST"])
def chat():
    try:
        # Parse and validate the request
        try:
            chat_request = ChatRequest(**request.json)
        except ValidationError as e:
            return jsonify(e.errors()), 422

        # print(f"Received message: {chat_request.message}")  # Logging input message

        # Start the conversation
        convo = model.start_chat(history=[])
        # print("Started chat session")  # Log chat session start
        
        # Interact with the model
        response = convo.send_message(chat_request.message)  # Corrected method
        # print("Message sent to the model")  # Log after sending message

        if not response or not hasattr(response, 'text'):
            raise Exception("Invalid response structure from the model")

        # print(f"Generated response: {response.text}")  # Logging response
        chat_response = ChatResponse(response=response.text)
        return jsonify(chat_response.dict())

    except Exception as e:
        print(f"Error: {str(e)}")  # Logging error details
        return jsonify({"detail": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
