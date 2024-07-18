"use client";

import { useState, useRef } from "react";
import ChatBubble from "../components/chat-bubble";

export default function Interview() {
    const [isRecording, setIsRecording] = useState(false);
    const [messages, setMessages] = useState<string[]>([]);
    const [currentQuesion, setCurrentQuestion] = useState<string>("");
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

            mediaRecorder.ondataavailable = async (event) => {
                if (event.data.size > 0 && socketRef.current?.readyState === WebSocket.OPEN) {
                    const arrayBuffer = await event.data.arrayBuffer();
                    socketRef.current.send(arrayBuffer);
                }
            };

            setIsRecording(true);
        };

        const handleTextToSpeech = async (text: string) => {
            const sModelId = "tts-1-hd";
            const sVoiceId = "echo";
            const API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

            mediaRecorderRef.current?.pause();

            const data = {
                model: sModelId,
                input: text,
                voice: sVoiceId,
            };

            try {
                const response = await fetch("https://api.openai.com/v1/audio/speech", {
                    method: "POST",
                    headers: {
                        "Accept": "audio/mpeg",
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${API_KEY}`,
                    },
                    body: JSON.stringify(data),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const arrayBuffer = await response.arrayBuffer();
                const blob = new Blob([arrayBuffer], { type: 'audio/mpeg' });
                const audioURL = window.URL.createObjectURL(blob);
                const audio = new Audio(audioURL);
                audio.play();
            } catch (error) {
                console.error('Error generating audio:', error);
            } finally {
                mediaRecorderRef.current?.resume();
            }
        };

        socketRef.current.onmessage = async (event) => {
            const receivedTextFromWS = event.data;
            setMessages((prev) => ([...prev, receivedTextFromWS]));
            if (receivedTextFromWS.split(":")[0] === "Interviewer") {
                setCurrentQuestion(receivedTextFromWS.split(":").slice(1, receivedTextFromWS.length));
                await handleTextToSpeech(receivedTextFromWS.split(":")[1]);
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
        <div className="w-full h-lvh grid grid-cols-4">
            <div className="col-span-3">
                <div className="h-full flex flex-col items-center justify-center">
                    <div className="w-full h-full flex flex-col justify-center items-center">
                        <p className="font-bold text-2xl">{currentQuesion}</p>
                        <iframe src="https://lottie.host/embed/af8dcbf4-b3ec-4c22-83c2-4a36273700fb/ZEJeLTRRio.json"></iframe>
                    </div>
                    <div className="bg-black w-full shadow-lg p-4 flex space-x-4 justify-center items-center">
                        {
                            isRecording ?
                                <button onClick={stopRecording}>
                                    <img src="/end-call-icon.svg" alt="End Call" className="w-12 h-12" />
                                </button> :
                                <button
                                    className="px-4 py-2 ring-2 ring-gray-300 rounded-md text-white"
                                    onClick={startRecording}
                                >
                                    Start Interview
                                </button>
                        }
                    </div>
                </div>
            </div>
            <div className="h-full max-h-lvh bg-gray-200 py-12 px-6 flex flex-col">
                <div className="h-1/4 p-2 flex flex-col justify-evenly">
                    <div className="flex justify-between">
                        <p className="font-semibold font-md">Frontend Developer</p>
                        <div className="flex justify-between">
                            <img src="/Linkedin.svg" className="mx-1" />
                            <img src="/Weblink.svg" />
                        </div>
                    </div>
                    <p>Company Name</p>
                    <p className="underline">View Job Details</p>
                </div>
                <div className="bg-white w-full h-full overflow-y-scroll p-4 rounded-md flex flex-col">
                    {messages.map((message, i) =>
                        <ChatBubble key={i} message={message.split(":")[1]} sender={message.split(":")[0]} />
                    )}
                </div>
            </div>
        </div>
    );
}
