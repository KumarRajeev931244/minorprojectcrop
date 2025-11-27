import tensorflow as tf
import numpy as np
import os

IMAGE_SIZE = 224
BATCH_SIZE = 32

data = tf.keras.preprocessing.image_dataset_from_directory(
    "dataset",
    image_size=(IMAGE_SIZE, IMAGE_SIZE),
    batch_size=BATCH_SIZE
)

class_names = data.class_names

# Save class labels
import json
with open("class_names.json", "w") as f:
    json.dump(class_names, f)

# Normalize
data = data.map(lambda x, y: (x/255, y))

# Split dataset
train_size = int(len(data) * 0.8)
train_ds = data.take(train_size)
val_ds = data.skip(train_size)

# Model (Transfer learning - MobileNetV2)
base_model = tf.keras.applications.MobileNetV2(
    input_shape=(IMAGE_SIZE, IMAGE_SIZE, 3),
    include_top=False,
    weights="imagenet"
)
base_model.trainable = False

model = tf.keras.Sequential([
    base_model,
    tf.keras.layers.GlobalAveragePooling2D(),
    tf.keras.layers.Dropout(0.3),
    tf.keras.layers.Dense(len(class_names), activation="softmax")
])

model.compile(
    optimizer="adam",
    loss="sparse_categorical_crossentropy",
    metrics=["accuracy"]
)

model.fit(train_ds, validation_data=val_ds, epochs=5)

# Save the trained model
model.save("plant_disease_model")
