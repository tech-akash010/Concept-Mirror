import { useState, useEffect, useCallback, useRef } from 'react';

// Custom hook for speech recognition
export const useSpeechRecognition = () => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [isSupported, setIsSupported] = useState(false);
    const [error, setError] = useState(null);
    const recognitionRef = useRef(null);

    useEffect(() => {
        // Check if SpeechRecognition is supported
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (SpeechRecognition) {
            setIsSupported(true);
            recognitionRef.current = new SpeechRecognition();

            // Configure recognition
            recognitionRef.current.continuous = true;
            recognitionRef.current.interimResults = true;
            recognitionRef.current.lang = 'en-US';

            // Handle results
            recognitionRef.current.onresult = (event) => {
                let interimTranscript = '';
                let finalTranscript = '';

                for (let i = event.resultIndex; i < event.results.length; i++) {
                    const transcriptPiece = event.results[i][0].transcript;
                    if (event.results[i].isFinal) {
                        finalTranscript += transcriptPiece + ' ';
                    } else {
                        interimTranscript += transcriptPiece;
                    }
                }

                setTranscript(prev => prev + finalTranscript + interimTranscript);
                setError(null); // Clear any errors on successful recognition
            };

            // Handle errors
            recognitionRef.current.onerror = (event) => {
                console.error('Speech recognition error:', event.error);

                // Set user-friendly error messages
                switch (event.error) {
                    case 'not-allowed':
                    case 'permission-denied':
                        setError('Microphone access denied. Please allow microphone permissions in your browser settings.');
                        break;
                    case 'no-speech':
                        // Don't show error for no-speech, just continue
                        setError(null);
                        return;
                    case 'audio-capture':
                        setError('No microphone found. Please connect a microphone and try again.');
                        break;
                    case 'network':
                        setError('Network error. Please check your connection.');
                        break;
                    case 'aborted':
                        // User stopped recording, don't show error
                        setError(null);
                        return;
                    default:
                        setError(`Recognition error: ${event.error}. Please try again.`);
                }

                // Stop listening on critical errors
                setIsListening(false);
            };

            // Handle start
            recognitionRef.current.onstart = () => {
                setError(null);
            };

            // Handle end
            recognitionRef.current.onend = () => {
                // Auto-restart if still supposed to be listening and no critical error
                if (isListening && recognitionRef.current && !error) {
                    try {
                        recognitionRef.current.start();
                    } catch (err) {
                        console.error('Error restarting recognition:', err);
                        setIsListening(false);
                    }
                } else {
                    setIsListening(false);
                }
            };
        }

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, [isListening, error]);

    const startListening = useCallback(() => {
        if (recognitionRef.current && !isListening) {
            setTranscript('');
            setError(null);
            try {
                recognitionRef.current.start();
                setIsListening(true);
            } catch (err) {
                console.error('Error starting recognition:', err);
                setError('Failed to start voice input. Please try again.');
            }
        }
    }, [isListening]);

    const stopListening = useCallback(() => {
        if (recognitionRef.current && isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        }
    }, [isListening]);

    const resetTranscript = useCallback(() => {
        setTranscript('');
    }, []);

    const clearError = useCallback(() => {
        setError(null);
    }, []);

    return {
        isListening,
        transcript,
        isSupported,
        error,
        startListening,
        stopListening,
        resetTranscript,
        clearError
    };
};
