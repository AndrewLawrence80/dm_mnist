from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import MNISTLabel
from .serializers import MNISTLabelSerializer
# Create your views here.


@api_view(http_method_names=["GET","POST"])
def MNISTLabel_list(request: Request) -> Response:
    if request.method == "GET":
        mnist_label: MNISTLabel = MNISTLabel(label=1)
        serializer:MNISTLabelSerializer=MNISTLabelSerializer(mnist_label)
        return Response(serializer.data)
    if request.method=="POST":
        serializer=MNISTLabelSerializer(data=request.data)
        return Response(status=status.HTTP_201_CREATED)