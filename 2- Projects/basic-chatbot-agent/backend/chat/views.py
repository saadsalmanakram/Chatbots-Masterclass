from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from huggingface_hub import InferenceClient
import os

class ChatViewSet(APIView):
    def post(self, request):
        try:
            user_message = request.data.get('message')
            selected_model = request.data.get('model', "meta-llama/Llama-3.2-1B-Instruct")

            if not user_message:
                return Response(
                    {"error": "Message is required."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            api_key = os.getenv('HUGGINGFACE_API_KEY')
            if not api_key:
                return Response(
                    {"error": "Hugging Face API key not configured."},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )

            client = InferenceClient(api_key=api_key)

            messages = [
                {
                    "role": "user",
                    "content": user_message
                }
            ]

            response = client.chat.completions.create(
                model=selected_model,
                messages=messages,
                temperature=0.5,
                max_tokens=2048,
                top_p=0.7,
                stream=False
            )

            if not response or not response.choices:
                return Response(
                    {"error": "No response from Hugging Face API"},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )

            bot_response = response.choices[0].message.content

            response_data = {
                "status": "success",
                "response": bot_response,
                "model": selected_model
            }

            return Response(response_data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )