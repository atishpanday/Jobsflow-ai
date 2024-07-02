"use client";

import { useState, useRef } from "react";
import ReactMarkDown from "react-markdown"

export default function Interview() {
    const [isRecording, setIsRecording] = useState(false);
    const [receivedText, setReceivedText] = useState("");
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

        socketRef.current = new WebSocket("ws://localhost:8000/api/interview");

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

        const speakText = (text: string) => {
            const utterance = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(utterance);
            utterance.onend = () => {
                mediaRecorder.resume();
            };
        };

        socketRef.current.onmessage = (event) => {
            const receivedTextFromWS = event.data;
            setReceivedText((prevText) => prevText + receivedTextFromWS + "\n");
            mediaRecorderRef.current?.pause();
            if (receivedTextFromWS.split(":")[0] === "AI Interviewer") {
                speakText(receivedTextFromWS.split(":")[1]);
            }
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
            <p><ReactMarkDown>{receivedText}</ReactMarkDown></p>
        </div>
    );
}
