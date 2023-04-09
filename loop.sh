#!/bin/bash

JITSI_URL=https://knom.koreacentral.cloudapp.azure.com:8443
ROOM_NAME_PREFIX=client3
NUM_CONFERENCES=1
AUDIO_SENDER=3
VIDEO_SENDER=3
CORE_PER_CLIENT=1.3
DURATION=1200
IMAGE_TAG=justicedong/torture-selenium

for var in 100 200 300 400
do
    for i in 1 2 3 4 5 6
    do
        docker run -it --rm \
          -v /dev/shm:/dev/shm \
          $IMAGE_TAG:$var.0.$i \
          --instance-url=$JITSI_URL \
          --room-name-prefix=$ROOM_NAME_PREFIX-$var-$i \
          --conferences=$NUM_CONFERENCES \
          --audio-senders=$AUDIO_SENDER \
          --senders=$VIDEO_SENDER \
          --cores-per-client=$CORE_PER_CLIENT \
          --duration=$DURATION
    done
done