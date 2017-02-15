<template>
    <div class="speech">
        <div class="supported" v-if="isSupported">
            <p>Transcription: {{ transcription }}</p>
            <button @click="listen">🎤</button>
        </div>
        <div class="not-supported" v-else>
            Your browser doesn't support speech recognition 😢
        </div>
    </div>
</template>

<script>
    import commands from '../../utils/commands';

    export default {
        data () {
            return {
                isSupported: true,
                isListening: false,
                recognizer: null,
                transcription: '',
            }
        },
        created () {
            // Test browser 
            window.SpeechRecognition = window.SpeechRecognition ||
                window.webkitSpeechRecognition  ||
                null;
            if (window.SpeechRecognition === null) {
                this.isSupported = false;
            } else {
                this.recognizer = new window.SpeechRecognition();
                // Recogniser doesn't stop listening even if the user pauses
                this.recognizer.continuous = true;
                // interim results
                this.recognizer.interimResults = true;

                // Start recognising
                this.recognizer.onresult = (event) => {
                    this.transcription = '';
                    for (let result of event.results) {
                        if (result.isFinal) {
                            this.transcription = result[0].transcript + ' (Confidence: ' + result[0].confidence + ')';
                        } else {
                            this.transcription += result[0].transcript;
                        }
                    }
                };
            }
        },
        methods: {
            listen () {
                if (this.isListening) {
                    this.stop();
                } else {
                    this.play();
                }
                this.isListening = !this.isListening;
            },
            play () {
                try{
                  this.recognizer.start();
                  console.log('Recognition started');
               } catch(e) {
                  console.log(e.message);
               }
            },
            stop () {
                this.recognizer.stop();
                console.log('Recognition stopped');
                this.sendAction();
            },
            sendAction () {
                const actions = commands.getActions(this.transcription);
                const lights = commands.getLights(this.transcription);
                commands.send(actions, lights);
            }
        }
    }
</script>

<style scoped>
    
</style>
