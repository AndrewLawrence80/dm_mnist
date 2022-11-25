from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import MnistImage
from .serializers import MnistImageSerializer
from dm_mnist_backend.settings import MEDIA_ROOT
import os
from pytorch_mnist.predict import predict

# Create your views here.


@api_view(http_method_names=['POST'])
def mnist_classify(request: Request) -> Response:
    if request.method == 'POST':
        serializer = MnistImageSerializer(data=request.data)
        if serializer.is_valid():
            img_path = os.path.join(
                MEDIA_ROOT, MnistImage.upload_to, serializer.validated_data.get("image").name)
            if os.path.exists(img_path):
                os.remove(img_path)
            serializer.save()
            prediction = predict(img_path)
            print(prediction)
            return Response({"result": prediction}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
