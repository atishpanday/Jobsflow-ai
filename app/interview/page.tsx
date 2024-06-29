"use client";

import { useState, useRef } from "react";

export default function Interview() {
    const [isRecording, setIsRecording] = useState(false);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const socketRef = useRef<WebSocket | null>(null);

    async function startRecording() {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(
            stream,
            {
                mimeType: 'audio/webm',
            }
        );

        mediaRecorderRef.current = mediaRecorder;

        socketRef.current = new WebSocket('ws://localhost:8000/api/interview');

        socketRef.current.onopen = () => {
            mediaRecorder.start(100);

            mediaRecorder.addEventListener("dataavailable", async (event) => {
                console.log("data available now");
                console.log(event.data);
                if (event.data.size > 0 && socketRef.current?.readyState === WebSocket.OPEN) {
                    const arrayBuffer = await event.data.arrayBuffer();
                    socketRef.current.send(arrayBuffer);
                }
            });

            setIsRecording(true);
        };

        socketRef.current.onclose = () => {
            setIsRecording(false);
            mediaRecorder.stop();
        };
    };

    function stopRecording() {
        mediaRecorderRef.current?.stop();
        socketRef.current?.close();
    };

    return (
        <div>
            <h1>Real-time Audio Streaming</h1>
            <button onClick={isRecording ? stopRecording : startRecording}>
                {isRecording ? 'Stop Recording' : 'Start Recording'}
            </button>
        </div>
    );
}
