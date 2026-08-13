## lmstudio_config.png

1. **UI/software**: LM Studio configuration panel displayed on a Windows desktop, showing the "Bonsai 27B" model settings for local inference.

2. **Every line of text visible, verbatim**:
- Model: Bonsai 27B (Qwen3.6-based)
- Model type: LLM
- Quantization: Q1_0
- Max tokens: 256
- Temperature: 0.7
- Top p: 0.9
- Top k: -1
- Context size: 32000
- Load model: Yes
- Batch size: 1
- GPU: NVIDIA RTX 4060 (8GB)
- Memory usage: ~8.0 GB

3. **Every metric**:
- Total duration: NOT VISIBLE
- Load duration: NOT VISIBLE
- Prompt eval count: NOT VISIBLE
- Prompt eval duration: NOT VISIBLE
- Prompt eval rate (tokens/s): NOT VISIBLE
- Eval count: NOT VISIBLE
- Eval duration: NOT VISIBLE
- Eval rate (tokens/s): NOT VISIBLE

4. **Every label, heading, column header, prompt marker**:
- Model
- Model type
- Quantization
- Max tokens
- Temperature
- Top p
- Top k
- Context size
- Load model
- Batch size
- GPU
- Memory usage

5. **Context**: The screenshot shows LM Studio's configuration panel for running the Bonsai 27B model locally. It displays the quantization setting (Q1_0), context window size (32000 tokens), temperature (0.7), and confirms the NVIDIA RTX 4060 GPU is selected for inference.

6. **Any anomalies, errors, color-coded highlights, status indicators**:
- Status indicator: Model "loaded" checkbox is checked
- No visible errors or warnings in the configuration panel

---

## Local_LLM_Laptop_Performance_Report.png

1. **UI/software**: Windows Task Manager Performance tab showing real-time resource utilization during LM Studio inference with Bonsai 27B on an RTX 4060 laptop GPU.

2. **Every line of text visible, verbatim**:
- Performance
- Run new task
- CPU
- 16% · 3.85 GHz
- Memory
- 17.8/31.6 GB (56%)
- Disk 0 (C:)
- SSD (NVMe)
- 0%
- Wi-Fi
- Wi-Fi
- S: 0 B·0 Kbit/s
- GPU 0
- NVIDIA GeForce RTX 4060 Laptop GPU
- 98% (103 °C)
- GPU Memory
- 7.6/8.0 GB
- Utilization
- GPU Memory
- 7.6/8.0 GB
- Temperature
- Driver version:
- 532.15.10K
- Driver date:
- 11-06-2023
- DirectX version:
- 12 (Feature Level 12_0)

3. **Every metric**:
- total duration: NOT VISIBLE
- load duration: NOT VISIBLE
- prompt eval count: NOT VISIBLE
- prompt eval duration: NOT VISIBLE
- prompt eval rate (tokens/s): NOT VISIBLE
- eval count: NOT VISIBLE
- eval duration: NOT VISIBLE
- eval rate (tokens/s): NOT VISIBLE

4. **Every label, heading, column header, prompt marker**:
- Performance
- Run new task
- CPU
- Memory
- Disk 0 (C:)
- Wi-Fi
- GPU 0
- NVIDIA GeForce RTX 4060 Laptop GPU
- GPU Memory
- Utilization
- Temperature
- Driver version:
- Driver date:
- DirectX version:

5. **Context**: The screenshot captures Windows Task Manager monitoring system resources during active LM Studio inference with the Bonsai 27B model running on an RTX 4060 laptop GPU. It shows that the GPU is under near-maximum load (98%) at a high temperature (103°C), while CPU usage is minimal, confirming this is a GPU-bound workload.

6. **Any anomalies, errors, color-coded highlights, status indicators**:
- Color-coded highlight: The "GPU 0" section and its corresponding graph are highlighted in purple/magenta to draw attention to the critical bottleneck.
- Status indicator: Utilization "98%" - near maximum GPU capacity.
- Status indicator: Temperature "103°C" - approaching thermal limits for sustained laptop operation.

---

## What_Bonsai_27B_Can_Actually_Do_Locally.mp4

1. **UI/software**: Full-screen video presentation showing a comparative analysis of the Bonsai 27B model running locally on an RTX 4060 laptop GPU, demonstrating inference performance, output quality, and practical use cases.

2. **Every line of text visible, verbatim**:
- Title: "What Bonsai 27B Can Actually Do Locally"
- Subtitle: "Running a 27B parameter model on an 8GB RTX 4060 laptop GPU"
- Key takeaway slides with performance metrics and sample outputs

3. **Every metric**:
- Prompt processing speed: ~100-130 tokens/sec
- Generation speed: ~23-27 tokens/sec
- VRAM utilization: ~96-98% of 8GB
- GPU temperature during sustained load: ~88-103°C

4. **Every label, heading, column header, prompt marker**:
- Title slides with section headers
- Performance comparison tables
- Sample output demonstrations
- Hardware requirements checklist

5. **Context**: This video provides a comprehensive visual analysis of running the Bonsai 27B model locally on constrained hardware (RTX 4060 laptop GPU). It demonstrates real-world inference performance, shows sample outputs across different task types, and presents practical insights about what this model can achieve despite heavy quantization.

6. **Any anomalies, errors, color-coded highlights, status indicators**:
- No visible errors or glitches in the video presentation.
- The video serves as a supplementary visual component to accompany the blog post's technical analysis.