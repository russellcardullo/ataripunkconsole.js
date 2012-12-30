void setup() {
  size(600,400);
  frameRate(30);
}

void draw() {
  background(0);
  stroke(255);
  samples = AudioletApp.sampleBuffer();
  for (int i = 0; i < samples.length - 1; i++) {
    float x1 = map(i, 0, samples.length, 0, width);
    float x2 = map(i+1, 0, samples.length, 0, width);
    float y1 = map(samples[i], -1, 1, height * 0.9, height * 0.1);
    float y2 = map(samples[i+1], -1, 1, height * 0.9, height * 0.1);
    line(x1,y1,x2,y2);
  }
}

