import torch.nn as nn


class MNISTClassifyModel(nn.Module):
    def __init__(self):
        super().__init__()
        self.features = nn.Sequential(
            nn.Conv2d(in_channels=1, out_channels=3,
                      kernel_size=7, stride=2, padding=3, bias=False),
            nn.LeakyReLU(),
            nn.BatchNorm2d(3),
            nn.MaxPool2d(kernel_size=3, stride=1, padding=1),
            nn.Conv2d(in_channels=3, out_channels=64,
                      kernel_size=5, stride=2, padding=2, bias=False),
            nn.LeakyReLU(),
            nn.BatchNorm2d(64),
            nn.MaxPool2d(kernel_size=3, stride=1, padding=1),
            nn.Conv2d(in_channels=64, out_channels=256,
                      kernel_size=3, stride=2, padding=1, bias=False),
            nn.LeakyReLU(),
            nn.BatchNorm2d(256),
            nn.MaxPool2d(kernel_size=3, stride=1, padding=1),
            nn.AdaptiveAvgPool2d(7)
        )
        self.flatten = nn.Flatten()
        self.classifier = nn.Sequential(
            nn.Linear(256*7*7, 64),
            nn.LeakyReLU(),
            nn.Linear(64, 10),
        )

    def forward(self, x):
        x = self.features(x)
        x = self.flatten(x)
        x = self.classifier(x)
        return x


def get_model() -> MNISTClassifyModel:
    model = MNISTClassifyModel()
    return model
