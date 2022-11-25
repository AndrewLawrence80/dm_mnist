from PIL import Image
from PIL import ImageOps
from torchvision.transforms import functional
from .model import MNISTClassifyModel
import torch
from dm_mnist_backend.settings import PYTORCH_WEIGHT_DIR
import os


model = MNISTClassifyModel()
model.load_state_dict(torch.load(os.path.join(
    PYTORCH_WEIGHT_DIR, "best.pth"), map_location="cpu"))


def get_img(path):
    img = Image.open(path)
    return img


def transform_img(img):
    if img.mode == "RGBA":
        r, g, b, _ = img.split()
        img = Image.merge("RGB", (r, g, b))
    img = ImageOps.invert(img)
    img = img.convert("L")
    img = functional.to_tensor(img)
    img = functional.resize(img, [112, 112])
    img = torch.unsqueeze(img, 0)
    return img


def predict(img_path):
    img = get_img(img_path)
    img = transform_img(img)
    prediction = model(img)
    return int(prediction.argmax(1).numpy()[0])
